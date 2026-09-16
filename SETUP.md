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

- El transporte lo define **`EMAIL_SERVICE`** (`gmail`). El preset de nodemailer
  resuelve host, puerto y TLS (`smtp.gmail.com:465`, TLS implícito) y
  **sobreescribe** cualquier `SMTP_HOST`/`SMTP_PORT`. Por eso `mail.js` ya no
  los lee: tenerlos en el config los hacía parecer configurables.
- **No pongas `smtp-relay.gmail.com`.** Ese relay solo admite cuentas de Google
  Workspace con la IP de salida registrada. Con una cuenta Gmail normal todo
  envío falla con `550-5.7.0 Mail relay denied ... SMTP relay isn't supported
  for unmanaged work accounts`, aunque las credenciales sean válidas y `AUTH`
  pase. Se intentó y se revirtió; el historial está en `src/config/mail.js`.
- La validación del certificado TLS está activada y verificada contra el
  servidor real. `SMTP_INSECURE_TLS=true` existe solo para diagnosticar en
  local, nunca en producción.
- `/users/contact` está limitado por IP (`CONTACT_MAX_REQUESTS` por
  `CONTACT_WINDOW_MINUTES`, por defecto 5 cada 15 minutos). El límite depende
  de `app.set('trust proxy', 1)`: detrás del proxy de Render, sin eso todas las
  visitas comparten una sola IP y el límite las bloquearía a la vez.

### Al cambiar cualquier cosa del correo

`verify()` (`tools/test-smtp-tls.js`) solo hace EHLO, STARTTLS y AUTH. **Pasa
aunque el servidor vaya a rechazar el envío**, porque la política de relay se
aplica en MAIL FROM / RCPT TO. La única prueba concluyente es un envío real:

```bash
npm run send-testmail                        # a EMAIL_RECEIVER
npm run send-testmail -- alguien@ejemplo.com # a otra dirección, sin tocar .env
```

Recuerda que las variables de entorno de Render son independientes del `.env`
local: un cambio aquí no llega a producción hasta que se replica allí.

Comprobaciones sin enviar correo real:

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Build + watch + servidor con recarga |
| `npm run build` | Recompila CSS y JS minificados |
| `npm start` | Arranca el servidor (producción) |
| `npm run send-testmail` | Prueba el envío del formulario de contacto |
