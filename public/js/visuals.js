document.addEventListener('DOMContentLoaded', function() {
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
  });