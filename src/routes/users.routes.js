const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const { sendEmail } = require('../controllers/users.controller');

// This is the only write endpoint on the site and it sends an email on every
// successful hit, so it is the natural target for abuse: a loop against it
// floods the film company's inbox and burns the SMTP account's sending quota.
// Counted per IP, which relies on `trust proxy` being set correctly in app.js.
const contactLimiter = rateLimit({
    windowMs: (parseInt(process.env.CONTACT_WINDOW_MINUTES, 10) || 15) * 60 * 1000,
    limit: parseInt(process.env.CONTACT_MAX_REQUESTS, 10) || 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).type('text/plain; charset=utf-8').send(
            'Demasiados envíos desde esta conexión. Inténtalo de nuevo en unos minutos.\n' +
            'Too many submissions from this connection. Please try again in a few minutes.'
        );
    },
});

router.post('/contact', contactLimiter, sendEmail);

module.exports = router;
