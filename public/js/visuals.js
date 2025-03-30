document.addEventListener('DOMContentLoaded', function() {
  // Asegurar que el contenedor de caption se muestre por encima de la imagen
  document.querySelectorAll('.caption-container').forEach(function(cc) {
      cc.style.position = "relative";
      cc.style.zIndex = "2";
  });
  // Establecer posición y z-index para las imágenes parallax
  document.querySelectorAll('.parallax-img').forEach(function(img) {
      img.style.position = "absolute";
      img.style.zIndex = "1";
  });

  // Función para actualizar el efecto parallax
  function updateParallax() {
      document.querySelectorAll('.parallax-img').forEach(function(img) {
          const speed = parseFloat(img.getAttribute('data-speed')) || 0.3;
          const rect = img.getBoundingClientRect();
          // Calcula el offset multiplicando la posición vertical por la velocidad
          const offset = rect.top * speed;
          img.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      requestAnimationFrame(updateParallax);
  }
  updateParallax();

  // Manejo de hover para cambiar la imagen según resolución
  document.querySelectorAll('.parallax-article').forEach(function(article) {
      const img = article.querySelector('.parallax-img');
      if (!img) return;
      // Guardar la fuente original en un atributo personalizado, si no está guardado
      if (!img.getAttribute('data-original-src')) {
          img.setAttribute('data-original-src', img.src);
      }
      // Evento para mouseenter: cambiar la imagen de hover según la resolución
      article.addEventListener('mouseenter', function() {
          let hoverSrc;
          const width = window.innerWidth;
          // Seleccionar la imagen de hover correspondiente según el ancho de pantalla
          if (width >= 1024) {
              hoverSrc = img.getAttribute('data-hover-desktop');
          } else if (width >= 769) {
              hoverSrc = img.getAttribute('data-hover-laptop');
          } else {
              hoverSrc = img.getAttribute('data-hover-mobile');
          }
          if (hoverSrc) {
              img.src = hoverSrc;
          }
      });
      // Evento para mouseleave: restaurar la imagen original
      article.addEventListener('mouseleave', function() {
          img.src = img.getAttribute('data-original-src');
      });
  });
});
