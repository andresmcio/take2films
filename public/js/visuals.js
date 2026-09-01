document.addEventListener('DOMContentLoaded', function() {
    // Matches homeMobile.css (max-width: 768px). Kept as a media query rather
    // than a one-off innerWidth check so crossing the breakpoint re-runs the
    // right mode: previously the branch was chosen once at load, so resizing
    // between desktop and mobile left the page in a half-applied state until
    // a manual reload.
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const articles = document.querySelectorAll('.parallax-article');
    const images = document.querySelectorAll('.parallax-img');
    const captions = document.querySelectorAll('.caption-container');

    let rafId = null;
    let onScroll = null;

    function teardown() {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
        if (onScroll) { window.removeEventListener('scroll', onScroll); onScroll = null; }
        images.forEach(function(img) {
            img.style.transform = '';
            img.style.position = '';
            img.style.zIndex = '';
        });
        captions.forEach(function(cc) {
            cc.style.position = '';
            cc.style.zIndex = '';
        });
        articles.forEach(function(a) { a.classList.remove('focus'); });
    }

    // -----------------------------
    // Móvil: parallax por transform sobre <img>
    // -----------------------------
    function enableMobile() {
        captions.forEach(function(cc) {
            cc.style.position = 'relative';
            cc.style.zIndex = '2';
        });
        images.forEach(function(img) {
            img.style.position = 'absolute';
            img.style.zIndex = '1';
        });

        function update() {
            images.forEach(function(img) {
                const speed = parseFloat(img.getAttribute('data-speed')) || 0.3;
                const offset = img.getBoundingClientRect().top * speed;
                img.style.transform = `translate3d(0, ${offset}px, 0)`;
            });
            rafId = requestAnimationFrame(update);
        }
        rafId = requestAnimationFrame(update);
    }

    // -----------------------------
    // Escritorio: background-attachment fixed + clase .focus al entrar en vista
    // -----------------------------
    function enableDesktop() {
        onScroll = function() {
            articles.forEach(function(article) {
                const rect = article.getBoundingClientRect();
                const inView = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                article.classList.toggle('focus', inView);
            });
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    function apply() {
        teardown();
        if (mobileQuery.matches) { enableMobile(); } else { enableDesktop(); }
    }

    apply();
    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', apply);
    } else {
        mobileQuery.addListener(apply); // Safari < 14
    }

    // El intercambio de imagen al pasar el cursor sólo existe en móvil
    // (data-hover-mobile); en escritorio el <img> está oculto, así que basta
    // con enlazarlo una vez.
    articles.forEach(function(article) {
        const img = article.querySelector('.parallax-img');
        if (!img) return;
        if (!img.getAttribute('data-original-src')) {
            img.setAttribute('data-original-src', img.src);
        }
        article.addEventListener('mouseenter', function() {
            const hoverSrc = img.getAttribute('data-hover-mobile');
            if (hoverSrc) img.src = hoverSrc + '?t=' + Date.now();
        });
        article.addEventListener('mouseleave', function() {
            img.src = img.getAttribute('data-original-src');
        });
    });
});
