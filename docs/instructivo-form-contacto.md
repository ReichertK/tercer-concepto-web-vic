# Form de contacto

Notas para el que deploye o toque el formulario.

## Por qué no andaba

Venían tres cosas pisadas. El captcha tenía la site key de prueba de Turnstile, que contra un backend con secret real rechaza todo. El CORS dejaba pasar solo `www.phir-it.ar` y el sitio corre en `phir-it.ar` pelado, así que el navegador bloqueaba la respuesta. Y el clavo final era el SMTP: el handshake TLS contra `mail.phir-it.ar` se caía porque el certificado del hosting no matchea ese hostname. Aflojando la verificación del cert salió el mail. De paso quedó el endpoint y la key en un archivo aparte para tocarlos sin recompilar, y el captcha opcional.

## Cómo está armado

El front le pega a un backend PHP en el mismo hosting (`/php/contact.php`) que manda el mail por SMTP con `contacto@phir-it.ar`. Si el backend falla, el form cae a un plan B y abre el cliente de correo del visitante con el mensaje cargado. Eso despista, porque parece que mandó. Si se abre el correo en vez de salir el mail, F12 y buscá la línea `[contacto]` en la consola: ahí está el motivo real.

## config.js, lo que cambiás sin recompilar

En la raíz del server hay un `config.js` suelto.

```js
window.__PHIRIT_CONFIG__ = {
  contactEndpoint: 'https://phir-it.ar/php/contact.php',
  turnstileSiteKey: '',
}
```

`contactEndpoint` es a dónde manda el form; vacío lo deja en el plan B. `turnstileSiteKey` vacío es captcha apagado. Lo editás y nada más. Un detalle: el `config.js` también sale en el build, así que si lo cambiás en el server replicá el cambio en `public/config.js` del repo o el próximo deploy te lo pisa.

## Deploy del front

Corré `npm run build:deploy`, que arma todo en `dist/`. Subí el contenido de `dist/` (no la carpeta) a la raíz del sitio, sobrescribiendo. Activá los archivos ocultos para que viaje el `.htaccess`, si no se rompen las rutas internas.

## Backend PHP

En la carpeta `php/` del server conviven dos archivos. `contact.php` es el código, sale del repo (`backend/php/contact.php`) y no tiene secretos. `config.php` vive solo en el server con la contraseña del correo y no va al repo.

```php
<?php

return [
    'smtp_host'      => 'mail.phir-it.ar',
    'smtp_port'      => 465,
    'smtp_secure'    => 'ssl',

    'smtp_user'      => 'contacto@phir-it.ar',
    'smtp_pass'      => 'LA_CONTRASEÑA_REAL',

    'mail_from'      => 'contacto@phir-it.ar',
    'mail_from_name' => 'Web PHIR-IT',
    'mail_to'        => 'contacto@phir-it.ar',

    'allowed_origin' => 'https://phir-it.ar',

    'turnstile_secret' => '',
];
```

No subas el `config.example.php` encima del `config.php`: el de ejemplo trae host y contraseña dummy y te tira el SMTP. El `allowed_origin` va en singular y el `contact.php` ya cubre con y sin `www`, así que con `https://phir-it.ar` alcanza (si hay varios, separados por coma). El `turnstile_secret` y la `turnstileSiteKey` van de a pares: las dos reales del mismo sitio o las dos vacías; mezclar real con prueba rechaza todo.

## Captcha

Sacás site key y secret del mismo sitio en el panel de Cloudflare Turnstile (gratis e ilimitado, no hace falta mover el dominio a Cloudflare). La site key va en `config.js` (`turnstileSiteKey`) y el secret en `config.php` (`turnstile_secret`). Subís los dos y el captcha aparece solo. Vacíos los dos, queda apagado y el form sigue mandando con el honeypot de fondo.

## Si algo se rompe

Probá el form, F12, consola, línea `[contacto]`. El `detail` dice qué pasó. Con `No se pudo conectar al SMTP`, revisá host, puerto y contraseña en `config.php`; si tira `Connection refused`, probá el 587 con `tls`. Si la consola marca CORS, el `allowed_origin` no coincide con el dominio real. Si cae al plan B sin error claro, casi siempre es el `contactEndpoint` mal escrito o el backend caído. Para confirmar, mandá una prueba desde `phir-it.ar/contacto` (Ctrl+F5 antes) y fijate que llegue a `contacto@phir-it.ar`.
