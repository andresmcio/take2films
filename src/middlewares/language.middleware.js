const i18n = require('../config/i18n.config');

const languageMiddleware = (req, res, next) => {
    let locale = req.query.lang; // Obtener el idioma de la query param 'lang'

    // Si no hay un valor de lang en la query string, usa el idioma preferido del navegador
    if (!locale || !['es', 'en'].includes(locale)) {
        const lang = req.acceptsLanguages(['es', 'en']);
        locale = lang === 'es' ? 'es' : 'en';  // Si el navegador prefiere español, usar 'es'
    }

    // Configurar el idioma en i18n
    i18n.setLocale(req, locale);

    next();
};

module.exports = languageMiddleware;