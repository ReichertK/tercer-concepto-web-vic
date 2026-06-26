<?php

// Backend del form de contacto, versión PHP.
// Recibe lo que carga la gente y lo manda por mail con el SMTP propio.
// Sin librerías ni Composer: anda en cualquier hosting con PHP (Ferozo incluido).
//
// Para ponerlo a andar:
//   1. Copiá config.example.php a config.php y cargá el SMTP. El config.php lleva
//      la contraseña, así que queda solo en el server (no va al repo).
//   2. Subí esta carpeta al hosting.
//   3. En ContactForm.tsx, apuntá CONTACT_API_ENDPOINT a este archivo
//      (ej. https://www.phir-it.ar/php/contact.php).

declare(strict_types=1);

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => false, 'message' => 'Falta config.php en el servidor.']);
    exit;
}
/** @var array<string,mixed> $cfg */
$cfg = require $configPath;

// CORS: solo dejamos entrar al dominio del sitio.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = (string) ($cfg['allowed_origin'] ?? '');
if ($allowedOrigin !== '' && $origin === $allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// Aceptamos JSON o formulario clásico.
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Saca saltos de línea para que nadie meta cabeceras raras en el mail.
$clean = static fn (string $v): string => trim(str_replace(["\r", "\n"], ' ', $v));

$name = $clean((string) ($data['name'] ?? ''));
$email = $clean((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['botcheck'] ?? ($data['_gotcha'] ?? '')));

// Campo trampa. Si vino completo es un bot: devolvemos ok y no mandamos nada.
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Mensaje recibido.']);
    exit;
}

$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    $errors[] = 'El nombre no es válido.';
}
if ($email === '' || mb_strlen($email) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El email no es válido.';
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 1000) {
    $errors[] = 'El mensaje debe tener entre 10 y 1000 caracteres.';
}
if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// hCaptcha. Si hay un secret cargado en config, validamos el token contra hCaptcha
// antes de mandar nada. Sin secret, no se exige (queda solo el campo trampa).
$hcaptchaSecret = (string) ($cfg['hcaptcha_secret'] ?? '');
if ($hcaptchaSecret !== '') {
    $captcha = (string) ($data['h-captcha-response'] ?? '');
    if ($captcha === '' || !verify_hcaptcha($hcaptchaSecret, $captcha)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'No pudimos validar el captcha. Proba de nuevo.']);
        exit;
    }
}

$subject = 'Nueva consulta desde la web de PHIR-IT';
$bodyText = "Nombre: {$name}\n"
    . "Email: {$email}\n\n"
    . "Mensaje:\n{$message}\n";

[$ok, $detail] = smtp_send($cfg, $subject, $bodyText, $email, $name);

if ($ok) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado.']);
} else {
    http_response_code(502);
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar el mensaje.', 'detail' => $detail]);
}

/**
 * Valida el token de hCaptcha contra su API. Devuelve true solo si el captcha es valido.
 * Usa cURL si esta disponible y, si no, cae a un stream context (anda igual en Ferozo).
 */
function verify_hcaptcha(string $secret, string $token): bool
{
    $payload = http_build_query(['secret' => $secret, 'response' => $token]);

    if (function_exists('curl_init')) {
        $ch = curl_init('https://api.hcaptcha.com/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method'  => 'POST',
                'header'  => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $payload,
                'timeout' => 15,
            ],
        ]);
        $response = @file_get_contents('https://api.hcaptcha.com/siteverify', false, $context);
    }

    if (!is_string($response) || $response === '') {
        return false;
    }
    $result = json_decode($response, true);

    return is_array($result) && ($result['success'] ?? false) === true;
}

/**
 * Manda un mail de texto por SMTP autenticado, sin librerías.
 * Sirve para SSL (puerto 465) o STARTTLS (puerto 587).
 *
 * @param array<string,mixed> $cfg
 * @return array{0:bool,1:string}
 */
function smtp_send(array $cfg, string $subject, string $bodyText, string $replyToEmail, string $replyToName): array
{
    $host = (string) ($cfg['smtp_host'] ?? '');
    $port = (int) ($cfg['smtp_port'] ?? 465);
    $secure = strtolower((string) ($cfg['smtp_secure'] ?? 'ssl')); // 'ssl' | 'tls'
    $user = (string) ($cfg['smtp_user'] ?? '');
    $pass = (string) ($cfg['smtp_pass'] ?? '');
    $from = (string) ($cfg['mail_from'] ?? $user);
    $fromName = (string) ($cfg['mail_from_name'] ?? 'Web PHIR-IT');
    $to = (string) ($cfg['mail_to'] ?? $user);

    if ($host === '' || $user === '' || $pass === '') {
        return [false, 'Configuración SMTP incompleta.'];
    }

    $remote = ($secure === 'ssl') ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}";
    $context = stream_context_create([
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
    ]);

    $errno = 0;
    $errstr = '';
    $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) {
        return [false, "No se pudo conectar al SMTP ({$errstr})."];
    }
    stream_set_timeout($fp, 20);

    $read = static function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            // La última línea de una respuesta tiene un espacio en la 4.ª posición.
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $code = static fn (string $resp): int => (int) substr($resp, 0, 3);
    $send = static function (string $command) use ($fp, $read): string {
        fwrite($fp, $command . "\r\n");
        return $read();
    };
    $fail = static function (string $msg) use ($fp): array {
        @fwrite($fp, "QUIT\r\n");
        @fclose($fp);
        return [false, $msg];
    };

    if ($code($read()) !== 220) {
        return $fail('El servidor SMTP no respondió el saludo inicial.');
    }

    $ehloHost = $_SERVER['SERVER_NAME'] ?? 'localhost';
    if ($code($send("EHLO {$ehloHost}")) !== 250) {
        return $fail('EHLO rechazado por el servidor.');
    }

    if ($secure === 'tls') {
        if ($code($send('STARTTLS')) !== 220) {
            return $fail('STARTTLS no fue aceptado.');
        }
        $crypto = stream_socket_enable_crypto(
            $fp,
            true,
            STREAM_CRYPTO_METHOD_TLS_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT
        );
        if ($crypto !== true) {
            return $fail('No se pudo establecer el cifrado TLS.');
        }
        if ($code($send("EHLO {$ehloHost}")) !== 250) {
            return $fail('EHLO posterior a TLS rechazado.');
        }
    }

    if ($code($send('AUTH LOGIN')) !== 334) {
        return $fail('El servidor no aceptó AUTH LOGIN.');
    }
    if ($code($send(base64_encode($user))) !== 334) {
        return $fail('Usuario SMTP rechazado.');
    }
    if ($code($send(base64_encode($pass))) !== 235) {
        return $fail('Autenticación SMTP fallida (revisá usuario y contraseña).');
    }

    if ($code($send("MAIL FROM:<{$from}>")) !== 250) {
        return $fail('El servidor rechazó la dirección de origen.');
    }
    $rcpt = $code($send("RCPT TO:<{$to}>"));
    if ($rcpt !== 250 && $rcpt !== 251) {
        return $fail('El servidor rechazó la dirección de destino.');
    }
    if ($code($send('DATA')) !== 354) {
        return $fail('El servidor no aceptó el comando DATA.');
    }

    $encodeHeader = static fn (string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

    // Normaliza el fin de línea y protege las líneas que empiezan con punto.
    $body = str_replace(["\r\n", "\r", "\n"], "\n", $bodyText);
    $body = preg_replace('/^\./m', '..', $body) ?? $body;
    $body = str_replace("\n", "\r\n", $body);

    $headers = 'Date: ' . date('r') . "\r\n"
        . 'From: ' . $encodeHeader($fromName) . " <{$from}>\r\n"
        . "To: <{$to}>\r\n"
        . 'Reply-To: ' . $encodeHeader($replyToName) . " <{$replyToEmail}>\r\n"
        . 'Subject: ' . $encodeHeader($subject) . "\r\n"
        . "MIME-Version: 1.0\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n";

    $message = $headers . "\r\n" . $body . "\r\n.";
    if ($code($send($message)) !== 250) {
        return $fail('El servidor no aceptó el contenido del mensaje.');
    }

    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);

    return [true, 'OK'];
}
