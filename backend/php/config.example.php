<?php

// Plantilla de configuración del backend PHP.
// Copiá este archivo como config.php y completá los datos reales del SMTP
// (los da el panel de Ferozo). El config.php NO se sube al repo: tiene la contraseña.
//
// Datos típicos de Ferozo (confirmar en el panel):
//   - Host:  c#######.ferozo.com  o  mail.tudominio.com
//   - Puerto 465 con 'ssl' (recomendado)  o  587 con 'tls'
//   - Usuario: la dirección completa, p. ej. contacto@phir-it.ar

return [
    // Servidor SMTP
    'smtp_host'      => 'mail.tudominio.com',
    'smtp_port'      => 465,
    'smtp_secure'    => 'ssl', // 'ssl' para el 465, 'tls' para el 587

    // Credenciales de la casilla
    'smtp_user'      => 'contacto@phir-it.ar',
    'smtp_pass'      => 'PONER_AQUI_LA_CONTRASENA',

    // Remitente y destinatario
    'mail_from'      => 'contacto@phir-it.ar',
    'mail_from_name' => 'Web PHIR-IT',
    'mail_to'        => 'contacto@phir-it.ar',

    // Dominio del sitio (para permitir las peticiones del formulario)
    'allowed_origin' => 'https://www.phir-it.ar',
];
