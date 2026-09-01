# Take 2 Films — local setup

## Requisitos

- **Node.js 18 o superior** (declarado en `engines` de `package.json`).
  Todas las dependencias del proyecto aceptan Node 18. Si añades un paquete
  nuevo, comprueba su campo `engines`: un paquete que exija Node 20+ instala
  sin quejarse y luego revienta al ejecutar.
- npm
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

## Correo y formulario de contacto

- El transporte SMTP se configura **solo** con `SMTP_HOST` y `SMTP_PORT`. No
  vuelvas a añadir `EMAIL_SERVICE`: los presets de nodemailer sobrescriben
  host y puerto, y durante un tiempo el correo salió por `smtp.gmail.com:465`
  aunque el `.env` dijera `smtp-relay.gmail.com:587`.
- La validación del certificado TLS está activada y `requireTLS` obliga a
  STARTTLS. `SMTP_INSECURE_TLS=true` existe solo para diagnosticar en local.
- `/users/contact` está limitado por IP (`CONTACT_MAX_REQUESTS` por
  `CONTACT_WINDOW_MINUTES`, por defecto 5 cada 15 minutos). El límite depende
  de `app.set('trust proxy', 1)`: detrás del proxy de Render, sin eso todas
  las visitas comparten una sola IP y el límite las bloquearía a la vez.

Envío de prueba real. Va a `EMAIL_RECEIVER`, igual que el formulario, así que
comprueba a dónde apunta tu `.env` antes de ejecutarlo en producción:

```bash
npm run send-testmail                        # a EMAIL_RECEIVER
npm run send-testmail -- alguien@ejemplo.com # a otra dirección, sin tocar .env
```

`verify()` sólo hace EHLO, STARTTLS y AUTH. No prueba que el relay acepte el
sobre: `smtp-relay.gmail.com` aplica sus reglas de remitente y destinatario en
MAIL FROM / RCPT TO / DATA, así que un envío real es la única comprobación
concluyente antes de desplegar.

Comprobaciones sin enviar correo real:

```bash
node tools/test-mail-render.js   # cabeceras y escapado
node tools/test-mail-smtp.js     # envío completo contra un SMTP local de usar y tirar
node tools/test-smtp-tls.js      # ¿el servidor real presenta un certificado válido?
```

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Build + watch + servidor con recarga |
| `npm run build` | Recompila CSS y JS minificados |
| `npm start` | Arranca el servidor (producción) |
| `npm run send-testmail` | Prueba el envío del formulario de contacto |
