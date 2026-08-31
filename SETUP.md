# Take 2 Films — local setup

## Requisitos

- Node.js 18+ y npm
- Un archivo `.env` en la raíz (no versionado). Ver `.env.template`.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Levanta dos procesos a la vez:

- `grunt watch` — recompila los minificados cada vez que guardas un `.css` o `.js`
- `nodemon` — reinicia el servidor cuando cambias código de `src/`

Abre http://localhost:2026

## ⚠️ Lo más importante de este repositorio

**La aplicación sirve únicamente los archivos minificados.**

`src/views/includes/head.ejs` y `src/controllers/main.controller.js` cargan
solo `/css/min/*.min.css` y `/js/min/*.min.js`. Los fuentes en `public/css/`
y `public/js/` **no se sirven nunca**.

Esto significa que **editar un fuente sin recompilar no cambia nada en el
navegador**. Es un fallo silencioso: no hay error, la página simplemente
sigue mostrando la versión anterior.

Si editas CSS o JS y no ves el cambio, casi siempre es esto.

```bash
npm run build     # recompila todo a public/css/min y public/js/min
```

`npm run dev` ya lo hace al arrancar y en cada guardado. Si trabajas sin
`npm run dev`, ejecuta `npm run build` antes de comprobar el resultado y
**antes de cada commit**.

Los minificados están versionados en git, así que un `npm run build`
olvidado se propaga a producción.

### Despliegue (Render)

Render ejecuta `npm start`, que **no** recompila. Los `min/` que estén
commiteados son los que se publican. Alternativa si se prefiere automatizar:
configurar el Build Command de Render como `npm install && npm run build`
(requiere que las devDependencies se instalen).

## Otras convenciones

- **Textos**: todo string visible pasa por `__('clave')` (i18n). Cualquier
  clave nueva va en `src/config/locales/es.json` **y** en `en.json`. No se
  escriben textos directamente en las plantillas.
- **Imágenes**: `N-nombre_en_snake_case_ANCHOxALTO.png`, solo ASCII, donde
  `N` es la posición en la que se renderiza dentro de su sección.
- **Breakpoints**: un cambio de tile toca cuatro hojas de estilo —
  `homeMobile`, `homeTablet`, `homeLaptop`, `homeDesktop`. Se cargan en ese
  orden y `homeDesktop.css` no está dentro de un media query, así que
  cuidado con la especificidad.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Build + watch + servidor con recarga |
| `npm run build` | Recompila CSS y JS minificados |
| `npm start` | Arranca el servidor (producción) |
| `npm run send-testmail` | Prueba el envío del formulario de contacto |
