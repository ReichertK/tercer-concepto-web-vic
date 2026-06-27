// === Configuración del sitio — editá ESTE archivo en el server, sin recompilar ===
//
// Cambiás algo acá, subís SOLO este archivo al hosting y listo. No hace falta
// volver a compilar ni tocar nada más.
//
// IMPORTANTE: la site key de hCaptcha (acá abajo) y el secret (en el backend)
// tienen que ser del MISMO par sacado de hcaptcha.com. Si una es de prueba y la
// otra real, hCaptcha rechaza todos los mensajes y el form no manda nada.

window.__PHIRIT_CONFIG__ = {
  // URL del backend que manda el mail.
  //   - Vacío → el form abre el correo del visitante (no envía solo).
  //   - PHP   → 'https://phir-it.ar/php/contact.php'
  //   - C#    → 'https://phir-it.ar/contact'
  contactEndpoint: 'https://phir-it.ar/php/contact.php',

  // Site key PÚBLICA de hCaptcha (la real de hcaptcha.com).
  // Vacío = usa la de prueba, que NO sirve en producción.
  hcaptchaSiteKey: '',
}
