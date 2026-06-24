# PHIR-IT — Web

Sitio institucional de PHIR-IT. React + Vite, una SPA.

Muestra los productos web (RIS, PACS, Informes, Portal de Pacientes), los casos de éxito y un formulario de contacto que termina mandando un mail. Responsive, con modo oscuro. Nada más.

## Índice

- [Stack](#stack)
- [Antes de arrancar](#antes-de-arrancar)
- [Correr el proyecto](#correr-el-proyecto)
- [Cómo está armado](#cómo-está-armado)
- [Imágenes](#imágenes)
- [Formulario de contacto](#formulario-de-contacto)
- [Deploy](#deploy)
- [Modo oscuro](#modo-oscuro)

## Stack

| Qué | Para qué |
| --- | --- |
| React 19 + TypeScript | UI y tipado |
| Vite 8 | Dev server y build |
| Tailwind CSS 4 | Estilos y theming |
| Framer Motion | Animaciones |
| React Router 7 | Ruteo SPA con lazy load por página |
| React Hook Form + Zod | Validación del form |
| React Helmet Async | Meta tags (SEO) |

## Antes de arrancar

Necesitás Node 20+ y npm 10+. Chequealo:

```bash
node -v
npm -v
```

Si tenés algo más viejo, actualizá antes de seguir. Te vas a ahorrar errores raros.

## Correr el proyecto

```bash
npm install
npm run dev
```

El dev server te tira la URL en la terminal (casi siempre `http://localhost:5173`). Recarga en caliente, así que guardás y ves el cambio.

Los otros comandos:

```bash
npm run build     # build de producción → carpeta dist/
npm run preview   # sirve el dist/ local para chequearlo
npm run lint      # ESLint sobre todo el código
```

## Cómo está armado

```text
src/
├── components/
│   ├── layout/       Navbar, Footer, Layout, BackToTop
│   ├── seo/          SEOHead (meta tags)
│   └── ui/           Hero, Cards, ContactForm, FAQ, Lightbox
├── hooks/            useTheme (modo oscuro sin parpadeo)
├── pages/            Home, ProductsServices, SuccessCases, Contact, NotFound
├── utils/            assets.ts (rutas de imágenes)
├── App.tsx           rutas + lazy loading
├── main.tsx          entry point
└── index.css         Tailwind y variables de marca
```

## Imágenes

Todo lo público va en `public/img/`. Dentro de los componentes no pongas la ruta a mano: usá `asset()` de `src/utils/assets.ts`, que resuelve bien tanto en dev como en producción.

Una regla que **no es opcional**: nombres en minúsculas, con guiones, sin espacios ni tildes. El `asset()` no escapa caracteres, así que un archivo con espacios o mayúsculas rompe la URL en producción y no te enterás hasta que está deployado.

Ejemplo real, el fondo del Hero:

```text
public/img/fondo-sala-control.png
```

El componente `Hero` ya apunta ahí por la prop `backgroundImage`. Dejás la imagen con ese nombre y listo. Apuntá a ~1920 px de ancho y menos de 300 KB, o la home tarda en cargar.

## Formulario de contacto

`src/components/ui/ContactForm.tsx` valida, muestra estados de carga/éxito/error y manda cada consulta a **contacto@phir-it.ar**.

El envío lo hace un backend propio. Dejé **dos** en `backend/`, hacen exactamente lo mismo. Elegís uno según dónde aloje el cliente:

- `backend/csharp/` — ASP.NET Core. Para servidores con .NET (Windows hosting, VPS, server propio). El equipo ya escribe C#, así que es la más cómoda de tocar después.
- `backend/php/` — PHP plano, sin librerías ni Composer. Anda en hosting compartido (Ferozo incluido) sin instalar nada.

Los dos reciben el mismo JSON. El frontend no distingue cuál hay del otro lado: solo le cambiás la URL.


### ¿Cuál?

- Hosting PHP / Ferozo compartido → PHP.
- Server con .NET → C#.

El último paso es igual para los dos: poné la URL del backend en la constante `CONTACT_API_ENDPOINT` de `ContactForm.tsx`, corré `npm run build` y deployá.

### PHP

1. Subí `backend/php/` al hosting.
2. Copiá `config.example.php` a `config.php` y completá el SMTP del panel de Ferozo. El `config.php` con la contraseña queda solo en el server (ya está en `.gitignore`).
3. En `ContactForm.tsx`, `CONTACT_API_ENDPOINT` apunta al archivo, ej. `https://www.phir-it.ar/php/contact.php`.

### C#

1. Publicá `backend/csharp/` en un server con .NET 8.
2. Copiá `appsettings.example.json` a `appsettings.json` y cargá el SMTP. Mismo criterio: la contraseña no sube al repo.
3. Levantalo con `dotnet run`, o publicalo en el hosting .NET.
4. En `ContactForm.tsx`, `CONTACT_API_ENDPOINT` apunta al backend, ej. `https://www.phir-it.ar/contact`.

Cada envío cae como un mail a contacto@phir-it.ar con nombre, correo y mensaje de quien completó.

## Deploy

Primero compilás:

```bash
npm run build
```

Eso verifica los tipos (`tsc -b`) y arma el build optimizado con Vite. Sale todo en `dist/`.

Esa carpeta `dist/` es el sitio entero ya minificado, con assets optimizados. **Es lo único que subís al hosting.** `src/`, `node_modules/` y los configs no van: son para desarrollar.

Chequealo local antes de publicar:

```bash
npm run preview
```

### cPanel / Apache

1. Corré `npm run build`.
2. Entrá al Administrador de archivos de cPanel.
3. Subí **el contenido** de `dist/` (no la carpeta en sí) dentro de `public_html/` o el subdirectorio del dominio.
4. SPA + recarga = 404, salvo que redirijas todo a `index.html`. Creá un `.htaccess` en `public_html/`:

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

   Sin esa regla, recargar `/contacto` te tira 404.

¿No va en la raíz del dominio sino en `tudominio.com/sitio/`? Ajustá `base: '/sitio/'` en `vite.config.ts` y recompilá.

### Vercel / Netlify

Detectan Vite y resuelven el ruteo SPA sin que toques nada.

1. Subí el repo a GitHub.
2. En Vercel o Netlify, "Importar proyecto" y elegí el repo.
3. La config se autodetecta: build `npm run build`, output `dist`.
4. Cargá las variables de entorno (ej. `VITE_CONTACT_ENDPOINT`) en el panel.
5. Publicá. Cada `git push` redeploya solo.

En Netlify, si querés algo manual, arrastrás `dist/` a su panel y ya. El ruteo SPA viene resuelto.

## Modo oscuro

Guarda la preferencia en `localStorage` y respeta la del sistema. Para que no haya flash blanco al recargar, el tema se aplica con un script chico en `index.html` **antes** de pintar la página. No hay que mantener nada.

---

© PHIR-IT — Soluciones Tecnológicas Integrales para Salud.
