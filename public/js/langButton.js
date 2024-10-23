/* // Función para obtener el idioma almacenado en localStorage
function getLanguage() {
    return localStorage.getItem('lang') || 'en'; // Por defecto 'en' si no hay idioma almacenado
}

// Función para establecer el idioma en localStorage
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', function () {
    let currentLang = getLanguage(); // Obtener el idioma actual de localStorage

    // Si no hay idioma definido, intenta obtenerlo por ubicación
    if (!currentLang) {
        //updateLanguageSelector('en'); // Idioma por defecto: inglés


        // Si decides habilitar la detección por ubicación
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const countryCode = data.country_code;
                const langByLocation = (['ES', 'MX', 'AR', 'CO', 'CL', 'PE'].includes(countryCode)) ? 'es' : 'en';
                setLanguage(langByLocation);
                currentLang = langByLocation;
                updateLanguageSelector(langByLocation);
                location.reload(); 
            })
            .catch(err => {
                console.error('Error detecting location', err);
                updateLanguageSelector('en'); // En caso de error, por defecto a inglés
            }); 
        
    } else {
        updateLanguageSelector(currentLang); // Si ya existe un idioma almacenado, actualizar el selector
    }
});

document.getElementById('lang').addEventListener('click', function () {
    const currentLang = getLanguage(); // Obtener el idioma actual
    const newLang = currentLang === 'en' ? 'es' : 'en'; // Cambiar entre 'en' y 'es'

    setLanguage(newLang);  // Guardar el nuevo idioma en localStorage
    updateLanguageSelector(newLang); // Actualizar el selector visualmente
    location.reload();  // Recargar para aplicar el cambio
});

// Función para actualizar el estado visual del selector de idioma
function updateLanguageSelector(selectedLang) {
    const esSelect = document.getElementById('es-select');
    const enSelect = document.getElementById('en-select');

    if (selectedLang === 'es') {
        esSelect.classList.add('active');
        enSelect.classList.remove('active');
    } else {
        esSelect.classList.remove('active');
        enSelect.classList.add('active');
    }
} */

// Función para obtener el idioma de localStorage
function getLanguageFromLocalStorage() {
    return localStorage.getItem('lang') || 'en'; // Predeterminado 'en'
}

// Función para establecer el idioma en localStorage
function setLanguageInLocalStorage(lang) {
    localStorage.setItem('lang', lang);
}

// Actualizar el idioma cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    let currentLang = getLanguageFromLocalStorage();
    updateLanguageSelector(currentLang);

    // Si la URL no tiene ?lang=, añadirlo
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('lang') || urlParams.get('lang') !== currentLang) {
        window.location.search = `?lang=${currentLang}`;
    }
});

// Manejar el clic del botón de selección de idioma
document.getElementById('lang').addEventListener('click', function () {
    const currentLang = getLanguageFromLocalStorage();
    const newLang = currentLang === 'en' ? 'es' : 'en';

    setLanguageInLocalStorage(newLang);
    updateLanguageSelector(newLang);

    // Recargar la página con el nuevo idioma en la query param
    window.location.search = `?lang=${newLang}`;
});

// Función para actualizar la apariencia del selector
function updateLanguageSelector(selectedLang) {
    const esSelect = document.getElementById('es-select');
    const enSelect = document.getElementById('en-select');

    if (selectedLang === 'es') {
        esSelect.classList.add('active');
        enSelect.classList.remove('active');
    } else {
        esSelect.classList.remove('active');
        enSelect.classList.add('active');
    }
}