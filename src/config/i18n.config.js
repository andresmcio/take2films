const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'], // Idiomas soportados
  defaultLocale: 'en', // Idioma predeterminado
  directory: path.join(__dirname, 'locales'), // Directorio donde están los archivos de traducción
  objectNotation: true, // Soporte para objetos anidados en los archivos de traducción
  autoReload: true, // Recargar automáticamente las traducciones si cambian
  updateFiles: false, // No actualizar los archivos de traducción automáticamente
  syncFiles: false, // No sincronizar archivos entre idiomas
  interpolation: {
    escapeValue: false, // Desactivar el escape de HTML
  }
});

module.exports = i18n;