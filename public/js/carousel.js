document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#customCarousel');
    const items = carousel.querySelectorAll('.carousel-item');

    if (window.innerWidth >= 768) {
        carousel.querySelector('.carousel-item').classList.add('active');

        for (let i = 0; i < items.length; i += 2) {
            const next = items[i].nextElementSibling;

            if (next) {
                next.classList.add('active');
            }
        }
    }
});