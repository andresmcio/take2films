document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#customCarousel');
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    function handleCarousel() {
        if (mediaQuery.matches) {
            // Si es tablet o más grande
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach(item => {
                const cols = item.querySelectorAll('.col-12');
                cols.forEach(col => col.classList.add('col-md-6'));
            });
        } else {
            // Si es móvil
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach(item => {
                const cols = item.querySelectorAll('.col-12');
                cols.forEach(col => col.classList.remove('col-md-6'));
            });
        }
    }

    // Inicialización y ajuste en cambio de tamaño de pantalla
    handleCarousel();
    mediaQuery.addListener(handleCarousel);
});
