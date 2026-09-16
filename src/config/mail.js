require('dotenv').config();

// `service` resuelve host, puerto y modo TLS a la vez (para gmail:
// smtp.gmail.com:465 con TLS implícito) y SOBREESCRIBE cualquier host/port que
// se le pase. Aquí eso es deliberado, no un descuido.
//
// Historia, para que no se repita: este archivo pasó a leer SMTP_HOST y
// SMTP_PORT del entorno, que apuntaban a smtp-relay.gmail.com:587. Ese relay
// solo acepta cuentas de Google Workspace con la IP de salida registrada, y
// esta es una cuenta Gmail normal, así que todo envío moría con:
//
//   550-5.7.0 Mail relay denied [...]. Invalid credentials for relay for one of
//   the domains in: <hostname>.local (as obtained from HELO and MAIL FROM).
//   SMTP relay isn't supported for unmanaged work accounts.
//
// Las credenciales eran válidas (AUTH pasaba); lo que rechazaba era la política
// del relay. El preset `service` venía tapando ese valor equivocado desde el
// principio. Se queda, y SMTP_HOST/SMTP_PORT ya no se leen: tenerlos en el
// config los hacía parecer configurables cuando el preset los ignora.
//
// El fallback a 'gmail' es a propósito: si el entorno de producción no define
// EMAIL_SERVICE, el transporte sigue funcionando en lugar de quedarse sin host.
const transport_data = {
    service: process.env.EMAIL_SERVICE || 'gmail',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      // La validación de certificado se queda activada. Estuvo desactivada
      // (rejectUnauthorized: false), lo que acepta cualquier certificado y
      // renuncia a la garantía de estar hablando con Google. Verificado contra
      // el servidor real: autentica sin problema con validación estricta.
      // SMTP_INSECURE_TLS=true existe solo para diagnosticar en local.
      rejectUnauthorized: process.env.SMTP_INSECURE_TLS !== 'true',
      minVersion: 'TLSv1.2',
    },
  };

module.exports = transport_data;
