require('dotenv').config();
const nodemailer = require('nodemailer');

// Use the real transport, not a copy of it. This file used to declare its own
// config block, which drifted from src/config/mail.js: it still carried
// `service` (which overrides host/port) and rejectUnauthorized:false long
// after production stopped using them. A test that exercises different
// settings than production is worse than no test, because it passes.
const transport_data = require('../config/mail');

// Destinatario por defecto: EMAIL_RECEIVER, igual que el formulario real.
// Se puede sobreescribir puntualmente sin tocar el .env:
//   npm run send-testmail -- alguien@ejemplo.com
const recipient = process.argv[2] || process.env.TEST_MAIL_TO || process.env.EMAIL_RECEIVER;

if (!recipient) {
  console.error('No recipient. Set EMAIL_RECEIVER, or pass one as an argument.');
  process.exit(1);
}

const transporter = nodemailer.createTransport(transport_data);
const opts = transporter.transporter.options;

console.log('Transport');
console.log('  host           :', opts.host + ':' + opts.port);
console.log('  secure         :', opts.secure, ' requireTLS:', opts.requireTLS);
console.log('  cert validation:', opts.tls && opts.tls.rejectUnauthorized ? 'ON' : 'OFF (insecure)');
console.log('  recipient      :', recipient);
console.log();

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: recipient,
  subject: 'Prueba de correo - Take 2 Films',
  text: 'Este es un correo de prueba para verificar la configuración SMTP.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('FAILED:', error.message);
    if (error.responseCode) console.error('  SMTP code:', error.responseCode);
    if (error.response) console.error('  SMTP reply:', error.response);
    process.exit(1);
  }
  console.log('SENT:', info.response);
  console.log('  accepted:', info.accepted, ' rejected:', info.rejected);
});
