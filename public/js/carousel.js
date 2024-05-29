document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#customCarousel');
    const interval = 1500;
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;

    function moveCarousel(next) {
      $(carousel).carousel(next);
    }

    setInterval(() => {
      if (window.innerWidth < 768) {
        moveCarousel('next');
      } else {
        const nextIndex = (currentIndex + 2) % totalItems;
        $(carousel).carousel(nextIndex);
        currentIndex = nextIndex;
      }
    }, interval);
  });