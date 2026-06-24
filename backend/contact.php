<?php

/**
 * ============================================================================
 *  PHIR-IT  ·  Backend del formulario de contacto (envío por SMTP)
 * ============================================================================
 *
 *  Este script recibe los datos del formulario de contacto de la web y los
 *  envía por correo usando el SMTP propio (por ejemplo, el de Ferozo).
 *  NO necesita Composer ni librerías externas: usa solo PHP estándar.
 *
 *  -------------------------------------------------------------------------
 *  CÓMO PONERLO EN FUNCIONAMIENTO (cuando el sitio esté en el hosting propio)
 *  -------------------------------------------------------------------------
 *   1. Subí esta carpeta `backend/` al hosting (por FTP o el administrador
 *      de archivos del panel). Por ejemplo, que quede accesible como:
 *          https://www.tudominio.com/backend/contact.php
 *
 *   2. Copiá el archivo `config.example.php` y renombrá la copia a
 *      `config.php`. Abrilo y completá los datos reales del SMTP
 *      (host, puerto, usuario y contraseña) que figuran en el panel de
 *      Ferozo. El archivo `config.php` NO se sube al repositorio público
 *      (queda solo en el servidor), por seguridad.
 *
 *   3. En la web (frontend), abrí `src/components/ui/ContactForm.tsx` y
 *      poné en la constante CONTACT_PHP_ENDPOINT la URL pública de este
 *      archivo, por ejemplo:
 *          const CONTACT_PHP_ENDPOINT = '/backend/contact.php'
 *      Volvé a compilar (npm run build) y listo: el formulario pasa a
 *      enviar por SMTP propio en lugar de Web3Forms.
 *
 *  Requisitos del servidor: PHP 7.4+ con la extensión OpenSSL habilitada
 *  (viene activada por defecto en Ferozo y la mayoría de los hostings).
 * ============================================================================
 */

declare(strict_types=1);

// --- Carga de la configuración -------------------------------------------
$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'success' => false,
        'message' => 'Falta el archivo config.php en el servidor.',
    ]);
    exit;
}
/** @var array<string,mixed> $cfg */
$cfg = require $configPath;

// --- CORS (solo permite el dominio configurado) --------------------------
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

// --- Lectura de los datos (acepta JSON o formulario clásico) --------------
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$clean = static function (string $value): string {
    // Quita saltos de línea para evitar inyección de cabeceras de correo.
    return trim(str_replace(["\r", "\n"], ' ', $value));
};

$name = $clean((string) ($data['name'] ?? ''));
$email = $clean((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['botcheck'] ?? ($data['_gotcha'] ?? '')));

// --- Anti-spam: campo trampa (si viene completo, es un bot) ----------------
if ($honeypot !== '') {
    // Respondemos "ok" para no darle pistas al bot, pero no enviamos nada.
    echo json_encode(['success' => true, 'message' => 'Mensaje recibido.']);
    exit;
}

// --- Validación -----------------------------------------------------------
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

// --- Armado y envío del correo --------------------------------------------
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
 * Envía un correo de texto plano por SMTP autenticado, sin dependencias.
 * Soporta conexión SSL (puerto 465) o STARTTLS (puerto 587).
 *
 * @param array<string,mixed> $cfg
 * @return array{0:bool,1:string}  [éxito, detalle]
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
            // En SMTP, la última línea de una respuesta tiene un espacio en la
            // 4.ª posición ("250 ok"); las intermedias usan guion ("250-...").
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

    // Normaliza fin de línea y aplica "dot-stuffing" (líneas que empiezan con '.').
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
