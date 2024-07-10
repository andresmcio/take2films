document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#customCarousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    function restructureCarousel() {
        const items = Array.from(carouselInner.querySelectorAll('.carousel-item'));
        const images = [];

        items.forEach(item => {
            const cols = Array.from(item.querySelectorAll('.col-12, .col-md-6'));
            cols.forEach(col => {
                const img = col.querySelector('img');
                const caption = col.querySelector('.carousel-caption');
                images.push({ src: img.src, alt: img.alt, caption: caption.innerHTML });
            });
        });

        carouselInner.innerHTML = '';
        if (mediaQuery.matches) {
            for (let i = 0; i < images.length; i += 2) {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (i === 0) item.classList.add('active');
                
                const row = document.createElement('div');
                row.classList.add('row');
                
                for (let j = i; j < i + 2 && j < images.length; j++) {
                    const col = document.createElement('div');
                    col.classList.add('col-12', 'col-md-6');
                    
                    const img = document.createElement('img');
                    img.src = images[j].src;
                    img.alt = images[j].alt;
                    img.classList.add('d-block', 'w-100');
                    
                    const captionDiv = document.createElement('div');
                    captionDiv.classList.add('carousel-caption', 'd-none', 'd-md-block', 'p-3');
                    captionDiv.innerHTML = images[j].caption;
                    
                    col.appendChild(img);
                    col.appendChild(captionDiv);
                    row.appendChild(col);
                }
                
                item.appendChild(row);
                carouselInner.appendChild(item);
            }
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