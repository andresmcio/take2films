require('dotenv').config();
const nodemailer = require('nodemailer');

const transport_data = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
};

const transporter = nodemailer.createTransport(transport_data);

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_RECEIVER,
  subject: 'Prueba de correo',
  text: 'Este es un correo de prueba para verificar la configuración.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
