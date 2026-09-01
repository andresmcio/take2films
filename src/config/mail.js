require('dotenv').config();

// No `service` key here on purpose.
//
// This used to read `service: process.env.EMAIL_SERVICE` ("gmail") alongside
// SMTP_HOST and SMTP_PORT. Nodemailer's well-known service presets override
// host/port, so those two variables were silently ignored: the configured
// smtp-relay.gmail.com:587 was never used and mail actually went out over
// smtp.gmail.com:465. The environment is now the single source of truth.
const transport_data = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),

    // Port 587 starts in the clear and upgrades, so `secure` is false and
    // requireTLS makes the STARTTLS upgrade mandatory: without it nodemailer
    // falls back to sending in plaintext if the server does not advertise
    // STARTTLS, which is exactly what an active attacker would arrange.
    secure: false,
    requireTLS: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      // Certificate validation is ON. It was previously disabled outright,
      // which accepts any certificate and gives up the guarantee that we are
      // talking to Google rather than to whoever answered.
      // SMTP_INSECURE_TLS=true exists only to diagnose a certificate problem
      // locally; it must never be set in production.
      rejectUnauthorized: process.env.SMTP_INSECURE_TLS !== 'true',
      minVersion: 'TLSv1.2',
    },
  };

module.exports = transport_data;
