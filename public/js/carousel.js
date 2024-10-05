document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#customCarousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let originalHTML = carouselInner.innerHTML;

    function restructureCarousel() {
        const items = Array.from(carouselInner.querySelectorAll('.carousel-item'));
        const images = [];

        items.forEach(item => {
            const cols = Array.from(item.querySelectorAll('.col-12, .col-md-6'));
            cols.forEach(col => {
                const img = col.querySelector('img');
                const caption = col.querySelector('.carousel-caption');
                const captionClasses = Array.from(caption.classList).filter(cls => cls.startsWith('caption-'));
                images.push({ src: img.src, alt: img.alt, caption: caption.innerHTML, captionClasses: captionClasses });
            });
        });

        carouselInner.innerHTML = '';
        if (mediaQuery.matches) {
            // Restaurar el HTML original para pantallas grandes
            carouselInner.innerHTML = originalHTML;
        } else {
            images.forEach((image, index) => {
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
                
                const captionDiv = document.createElement('div');
                captionDiv.classList.add('carousel-caption', 'p-3');
                image.captionClasses.forEach(cls => captionDiv.classList.add(cls));
                captionDiv.innerHTML = image.caption;
                
                col.appendChild(img);
                col.appendChild(captionDiv);
                row.appendChild(col);
                
                item.appendChild(row);
                carouselInner.appendChild(item);
            });
        }
    }

    // Inicialización y ajuste en cambio de tamaño de pantalla
    restructureCarousel();
    mediaQuery.addListener(restructureCarousel);
});