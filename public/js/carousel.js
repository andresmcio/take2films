document.addEventListener('DOMContentLoaded', function() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    document.querySelectorAll('.carousel').forEach(function(carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        if (!carouselInner) return;

        // Desktop markup is the source of truth; snapshot it once so a
        // resize can never restructure an already-restructured DOM.
        const originalHTML = carouselInner.innerHTML;
        const images = [];

        carouselInner.querySelectorAll('.carousel-item').forEach(function(item) {
            item.querySelectorAll('.col-12, .col-md-6').forEach(function(col) {
                const img = col.querySelector('img');
                if (!img) return;
                const caption = col.querySelector('.carousel-caption');
                images.push({
                    src: img.getAttribute('src'),
                    alt: img.alt,
                    caption: caption ? caption.innerHTML : null,
                    captionClasses: caption
                        ? Array.from(caption.classList).filter(cls => cls.startsWith('caption-'))
                        : []
                });
            });
        });

        function restructureCarousel() {
            if (mediaQuery.matches) {
                // Restaurar el HTML original para pantallas grandes
                carouselInner.innerHTML = originalHTML;
                return;
            }

            carouselInner.innerHTML = '';
            images.forEach(function(image, index) {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (index === 0) item.classList.add('active');

                const row = document.createElement('div');
                row.classList.add('row');

                const col = document.createElement('div');
                col.classList.add('col-12');

                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                img.classList.add('d-block', 'w-100');
                col.appendChild(img);

                // Un carrusel sin textos (p. ej. Fusión) no lleva caption.
                if (image.caption !== null) {
                    const captionDiv = document.createElement('div');
                    captionDiv.classList.add('carousel-caption', 'p-3');
                    image.captionClasses.forEach(cls => captionDiv.classList.add(cls));
                    captionDiv.innerHTML = image.caption;
                    col.appendChild(captionDiv);
                }

                row.appendChild(col);
                item.appendChild(row);
                carouselInner.appendChild(item);
            });
        }

        restructureCarousel();

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', restructureCarousel);
        } else {
            mediaQuery.addListener(restructureCarousel); // Safari < 14
        }
    });
});
