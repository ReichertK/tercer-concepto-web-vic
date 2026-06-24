<?php

/**
 * ============================================================================
 *  PHIR-IT  ·  Configuración del envío de correo (PLANTILLA)
 * ============================================================================
 *
 *  PASOS:
 *   1. Copiá este archivo y nombrá la copia exactamente:  config.php
 *   2. Completá los valores con los datos reales del SMTP que figuran en el
 *      panel de Ferozo (sección de correo / cuentas de email).
 *   3. NO subas `config.php` a un repositorio público: contiene la contraseña.
 *      (Ya está incluido en .gitignore para que no se suba por error.)
 *
 *  Datos típicos de Ferozo (verificar en el panel, pueden variar):
 *    - Host SMTP:  suele ser  c#######.ferozo.com  o  mail.tudominio.com
 *    - Puerto 465 con 'ssl'   (recomendado)   ó   puerto 587 con 'tls'
 *    - Usuario:    la dirección completa, p. ej.  contacto@phir-it.ar
 *    - Contraseña: la de esa casilla de correo
 * ============================================================================
 */

return [
    // --- Servidor SMTP ---
    'smtp_host'      => 'mail.tudominio.com',
    'smtp_port'      => 465,
    'smtp_secure'    => 'ssl', // 'ssl' para el puerto 465, 'tls' para el 587

    // --- Credenciales de la casilla ---
    'smtp_user'      => 'contacto@phir-it.ar',
    'smtp_pass'      => 'PONER_AQUI_LA_CONTRASENA',

    // --- Remitente y destinatario ---
    'mail_from'      => 'contacto@phir-it.ar',
    'mail_from_name' => 'Web PHIR-IT',
    'mail_to'        => 'contacto@phir-it.ar',

    // --- Dominio del sitio (para permitir las peticiones del formulario) ---
    // Poné el dominio final, p. ej. 'https://www.phir-it.ar'.
    // Si el frontend y este script viven en el mismo dominio, podés dejarlo
    // como está o ajustarlo; el navegador no exige CORS en ese caso.
    'allowed_origin' => 'https://www.phir-it.ar',
];
