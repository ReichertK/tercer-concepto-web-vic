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
- [A) Formulario de contacto](#a-formulario-de-contacto)
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

## A) Formulario de contacto

El formulario (`src/components/ui/ContactForm.tsx`) valida los datos, muestra los
estados de carga, éxito y error, y manda cada consulta por mail a
**contacto@phir-it.ar**.

El envío lo hace un backend propio. Dejé **dos versiones listas** en la carpeta
`backend/` para que elijan la que mejor les venga según dónde vayan a alojar el
sitio:

- **`backend/csharp/`** → versión en **C# (ASP.NET Core)**. Es la ideal si tienen
  un servidor con **.NET** (hosting Windows, VPS o server propio). El equipo trabaja
  en C#, así que esta es la más cómoda para mantener.
- **`backend/php/`** → versión en **PHP**, sin librerías. Anda en casi cualquier
  hosting compartido (Ferozo incluido) sin instalar nada. Es la más simple de subir
  si el sitio queda en un hosting PHP.

Las dos hacen lo mismo y reciben los mismos datos, así que el frontend funciona con
cualquiera: solo cambia la URL.

> Mientras la web esté en GitHub Pages (que es estático y no corre backend), el
> formulario abre el correo del visitante con el mensaje ya escrito hacia
> contacto@phir-it.ar. En cuanto se publique uno de los backends y se cargue su URL,
> el formulario pasa a enviar solo.

### ¿Cuál elijo?

- ¿El sitio va a un hosting **PHP / Ferozo compartido**? → usá **PHP**.
- ¿Tienen un servidor **.NET**? → usá **C#**.

Cualquiera de los dos, el paso final es el mismo: poner la URL del backend en la
constante `CONTACT_API_ENDPOINT` de `src/components/ui/ContactForm.tsx`, hacer
`npm run build` y desplegar.

### Si eligen PHP

1. Subir la carpeta `backend/php/` al hosting.
2. Copiar `config.example.php` a `config.php` y completar los datos del SMTP que da
   el panel de Ferozo. El `config.php` con la contraseña queda solo en el servidor
   (ya está en `.gitignore`).
3. En `ContactForm.tsx`, poner en `CONTACT_API_ENDPOINT` la URL del archivo, por
   ejemplo `https://www.phir-it.ar/php/contact.php`.

### Si eligen C#

1. Publicar la carpeta `backend/csharp/` en un servidor con .NET 8.
2. Copiar `appsettings.example.json` a `appsettings.json` y completar los datos del
   SMTP. Ese archivo con la contraseña queda solo en el servidor (ya está en
   `.gitignore`).
3. Levantarlo con `dotnet run` o publicarlo en el hosting .NET.
4. En `ContactForm.tsx`, poner en `CONTACT_API_ENDPOINT` la URL del backend, por
   ejemplo `https://www.phir-it.ar/contact`.

Cada envío llega como un mail a **contacto@phir-it.ar** con el nombre, el correo y
el mensaje de quien completó el formulario.

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
