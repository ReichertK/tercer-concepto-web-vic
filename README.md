# PHIR-IT — Sitio Web Corporativo

Sitio web institucional de **PHIR-IT — Soluciones Tecnológicas Integrales para Salud**.
Presenta el ecosistema de productos web (RIS, PACS, Informes, Portal de Pacientes),
los casos de éxito y un formulario de contacto, con diseño responsive, modo oscuro
y optimización de rendimiento.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Instalación y desarrollo](#instalación-y-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Gestión de imágenes](#gestión-de-imágenes)
- [A) Guía de integración del formulario de contacto](#a-guía-de-integración-del-formulario-de-contacto)
- [B) Guía de despliegue (build y hosting)](#b-guía-de-despliegue-build-y-hosting)
- [Modo oscuro](#modo-oscuro)

---

## Stack tecnológico

| Herramienta | Uso |
| --- | --- |
| **React 19 + TypeScript** | Interfaz de usuario y tipado estático |
| **Vite 8** | Servidor de desarrollo y empaquetador de producción |
| **Tailwind CSS 4** | Estilos utilitarios y theming |
| **Framer Motion** | Animaciones y transiciones |
| **React Router 7** | Navegación SPA con lazy loading por página |
| **React Hook Form + Zod** | Validación robusta del formulario de contacto |
| **React Helmet Async** | Meta tags dinámicos (SEO) |

---

## Requisitos previos

- **Node.js 20** o superior
- **npm 10** o superior

Verificá las versiones instaladas:

```bash
node -v
npm -v
```

---

## Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo (recarga en caliente)
npm run dev
```

Abrí el navegador en la URL que muestra la terminal (por defecto
`http://localhost:5173`).

Otros comandos disponibles:

```bash
npm run build     # Compila el sitio para producción → carpeta dist/
npm run preview   # Sirve localmente el build de producción para verificarlo
npm run lint      # Analiza el código en busca de errores y malas prácticas
```

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── layout/       → Navbar, Footer, Layout, BackToTop
│   ├── seo/          → SEOHead (meta tags dinámicos)
│   └── ui/           → Hero, Cards, ContactForm, FAQ, Lightbox
├── hooks/            → useTheme (modo oscuro sin parpadeo)
├── pages/            → Home, ProductsServices, SuccessCases, Contact, NotFound
├── utils/            → assets.ts (resolución de rutas de imágenes)
├── App.tsx           → Rutas y carga diferida (lazy loading)
├── main.tsx          → Punto de entrada
└── index.css         → Configuración de Tailwind y variables de marca
```

---

## Gestión de imágenes

Todas las imágenes públicas viven en `public/img/`. Para referenciarlas dentro de
los componentes usá la función `asset()` de `src/utils/assets.ts`, que resuelve la
ruta correcta tanto en desarrollo como en producción.

> **Nombres SEO-friendly:** usá nombres descriptivos, en minúsculas y separados por
> guiones. Por ejemplo, la imagen de fondo del Hero se llama:
>
> ```text
> public/img/fondo-sala-control.png
> ```
>
> El componente `Hero` ya apunta a esa ruta mediante la prop `backgroundImage`.
> Solo tenés que colocar la imagen ahí con ese nombre. Para mejor rendimiento,
> usá un ancho de ~1920 px y un peso por debajo de 300 KB.

---

## A) Formulario de contacto (Web3Forms)

El formulario (`src/components/ui/ContactForm.tsx`) ya está **conectado y
funcionando**: valida los datos, muestra estados de carga/éxito/error y envía
cada consulta por correo a **contacto@phir-it.ar** a través de
[Web3Forms](https://web3forms.com) (un servicio gratuito que no necesita
servidor propio ni backend).

### Único paso pendiente — Generar la clave de acceso

La clave debe crearse desde la casilla **contacto@phir-it.ar**, porque ahí es donde
llegarán los mensajes:

1. Entrar a <https://web3forms.com> y poner el correo **contacto@phir-it.ar**.
2. Abrir el mail que envía Web3Forms a esa casilla y copiar la **Access Key**
   (es una clave pública, no es una contraseña).
3. Pegar esa clave en `src/components/ui/ContactForm.tsx`, reemplazando el texto
   `PEGAR_AQUI_LA_CLAVE_DE_WEB3FORMS`:

```ts
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY ?? 'a1b2c3d4-0000-0000-0000-xxxxxxxxxxxx'
```

4. Guardar, hacer commit y push. El deploy automático deja el formulario
   enviando mails de verdad.

> La clave es **pública por diseño** (Web3Forms la pensó para vivir en el
> frontend), así que no hay problema en dejarla en el código. Si se prefiere no
> tenerla en el repositorio, se puede definir como variable de entorno
> `VITE_WEB3FORMS_KEY` en el build.

### A dónde llegan los mensajes

Cada envío llega como un mail a **contacto@phir-it.ar** con el nombre, el correo y el
mensaje de quien completó el formulario. El plan gratuito permite hasta 250
envíos por mes; si se necesitara más, Web3Forms ofrece planes pagos.

### Formato del mensaje

```json
{
  "name": "Juan Pérez",
  "email": "juan@clinica.com",
  "message": "Quisiera una demo del ecosistema PHIR-IT."
}
```

---

## B) Guía de despliegue (build y hosting)

### Paso 1 — Compilar el sitio

```bash
npm run build
```

Este comando hace dos cosas:

1. Verifica los tipos de TypeScript (`tsc -b`).
2. Genera la versión optimizada del sitio con Vite.

El resultado se guarda en la carpeta **`dist/`**.

> **¿Qué es la carpeta `dist`?**
> Es el sitio ya compilado y listo para producción: HTML, CSS y JavaScript
> minimizados, con las imágenes y assets optimizados. **Esta es la única carpeta que
> se sube al hosting.** No se sube `src/`, `node_modules/` ni los archivos de
> configuración: son solo para desarrollo.

Para revisar el resultado localmente antes de publicar:

```bash
npm run preview
```

### Opción 1 — Hosting tradicional (cPanel / Apache)

1. Ejecutá `npm run build`.
2. Entrá al **Administrador de archivos** de cPanel.
3. Subí **todo el contenido de la carpeta `dist/`** (no la carpeta en sí) dentro de
   `public_html/` (o el subdirectorio del dominio correspondiente).
4. **Importante (rutas SPA):** como el sitio usa React Router, hay que redirigir
   todas las rutas a `index.html`. Creá un archivo `.htaccess` dentro de
   `public_html/` con este contenido:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   Sin esta regla, al recargar una página como `/contacto` el servidor devolvería un
   error 404.

> **Subdirectorio:** si el sitio NO se publica en la raíz del dominio (por ejemplo en
> `tudominio.com/sitio/`), configurá la opción `base` en `vite.config.ts`
> (`base: '/sitio/'`) y recompilá.

### Opción 2 — Plataformas modernas (Vercel / Netlify)

Estas plataformas detectan Vite automáticamente y manejan el ruteo SPA sin
configuración extra. Flujo recomendado:

1. Subí el proyecto a un repositorio de GitHub.
2. En **Vercel** o **Netlify**, elegí "Importar proyecto" y seleccioná el repo.
3. Confirmá la configuración (se detecta sola):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Agregá las variables de entorno (ej. `VITE_CONTACT_ENDPOINT`) en el panel de la
   plataforma.
5. Publicá. Cada `git push` vuelve a desplegar el sitio automáticamente.

> En **Netlify**, si preferís el despliegue manual, basta con arrastrar la carpeta
> `dist/` a su panel. El ruteo SPA ya viene resuelto por defecto.

---

## Modo oscuro

El sitio recuerda la preferencia del usuario (`localStorage`) y respeta la
configuración del sistema operativo. Para evitar el destello blanco al recargar
("parpadeo"), el tema se aplica mediante un pequeño script en `index.html` **antes**
de que la página se pinte. No requiere mantenimiento.

---

© PHIR-IT — Soluciones Tecnológicas Integrales para Salud.
