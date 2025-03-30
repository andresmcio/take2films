document.addEventListener('DOMContentLoaded', function() {
    // Definir un umbral para dispositivos móviles (por ejemplo, 769px)
    const mobileThreshold = 769;
  
    if (window.innerWidth < mobileThreshold) {
      // -----------------------------
      // Código para dispositivos móviles
      // Usando parallax.js versión (con <picture> y <img>)
      // -----------------------------
      
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
      
      // Función para actualizar el efecto parallax basado en transformaciones
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
      
      // Manejo de hover para cambiar la imagen según resolución en móviles
      document.querySelectorAll('.parallax-article').forEach(function(article) {
        const img = article.querySelector('.parallax-img');
        if (!img) return;
        // Guardar la fuente original en un atributo personalizado, si no está guardado
        if (!img.getAttribute('data-original-src')) {
          img.setAttribute('data-original-src', img.src);
        }
        // Evento para mouseenter: cambiar la imagen de hover según la resolución
        article.addEventListener('mouseenter', function() {
          let hoverSrc = img.getAttribute('data-hover-mobile'); // Solo se usa para móviles
          if (hoverSrc) {
            // Forzar recarga agregando un query string para evitar caché
            img.src = hoverSrc + '?t=' + Date.now();
          }
        });
        // Evento para mouseleave: restaurar la imagen original
        article.addEventListener('mouseleave', function() {
          img.src = img.getAttribute('data-original-src');
        });
      });
      
    } else {
      // -----------------------------
      // Código para dispositivos grandes (laptops y pantallas grandes)
      // Usando background-attachment: fixed para el efecto parallax
      // -----------------------------
      
      const articles = document.querySelectorAll('.parallax-article');
      window.addEventListener('scroll', function() {
        articles.forEach(article => {
          const rect = article.getBoundingClientRect();
          const inView = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
          if (inView) {
            article.classList.add('focus');
          } else {
            article.classList.remove('focus');
          }
        });
      });
    }
  });
  