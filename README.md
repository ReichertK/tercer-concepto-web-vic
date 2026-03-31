# PHIRIT – Sitio Web Corporativo

Sitio web institucional de **PHIRIT**, empresa de soluciones tecnológicas para el sector salud. Presenta el ecosistema de productos (RIS, PACS, Informes, Portal de Pacientes), casos de éxito y formulario de contacto.

## Stack

- **React 19** con TypeScript
- **Vite 8** como bundler
- **Tailwind CSS 4** para estilos
- **Framer Motion** para animaciones
- **React Router** para navegación SPA
- **React Hook Form + Zod** para validación del formulario de contacto
- **React Helmet Async** para SEO dinámico

## Requisitos

- Node.js 20 o superior
- npm 10+

## Instalación

```bash
git clone https://github.com/tu-usuario/tercer-concepto-web-vic.git
cd tercer-concepto-web-vic
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build de producción

```bash
npm run build
npm run preview   # para previsualizar el build localmente
```

Los archivos compilados quedan en `dist/`.

## Estructura del proyecto

```text
src/
├── components/
│   ├── layout/       → Navbar, Footer, Layout, BackToTop
│   ├── seo/          → SEOHead (meta tags dinámicos)
│   └── ui/           → Componentes reutilizables (Hero, Cards, Form, FAQ)
├── hooks/            → useTheme (dark mode)
├── pages/            → Home, ProductsServices, SuccessCases, Contact, NotFound
├── App.tsx           → Rutas y lazy loading
├── main.tsx          → Entry point
└── index.css         → Configuración de Tailwind y custom properties
```

## Lint

```bash
npm run lint
```
