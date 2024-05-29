const nodemailer = require('nodemailer');
const transport_data = require('../config/mail');

module.exports = {
    sendEmail: (req,res) => {
        const { name, surname, email, mobileNumber, message } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Formulario web: ${name} ${surname} quiere que le contactes`,
            text: `
                Contacto:
                Nombre: ${name} ${surname}
                Email: ${email}
                Número de teléfono: ${mobileNumber}
        
                Mensaje:
                ${message}
            `
        }

        const transporter = nodemailer.createTransport(transport_data);

        transporter.sendMail( mailOptions , (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/');
            }
        });
    },
}