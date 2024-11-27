// Función para detener videos al cerrar el modal
function stopVideo(modal) {
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = src;  // Reiniciar el src para detener el video
    }
}

// Inicializar API de YouTube
function onYouTubeIframeAPIReady() {
    const players = {};
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        const iframe = modal.querySelector('iframe');
        if (iframe && iframe.src.includes('youtube.com')) {
            const videoId = new URL(iframe.src).searchParams.get('v');
            players[videoId] = new YT.Player(iframe, {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    });

    function onPlayerReady(event) {
        const player = event.target;
        const modal = player.getIframe().closest('.modal');

        modal.addEventListener('shown.bs.modal', function () {
            player.playVideo();
        });

        modal.addEventListener('hidden.bs.modal', function () {
            player.pauseVideo();
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            stopVideo(event.target.getIframe().closest('.modal'));
        }
    }
}

// Cargar API de YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Inicializar eventos de Vimeo
document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const iframe = modal.querySelector('iframe');
        if (iframe && iframe.src.includes('vimeo.com')) {
            const player = new Vimeo.Player(iframe);
            
            modal.addEventListener('shown.bs.modal', function () {
                player.play();
            });

            modal.addEventListener('hidden.bs.modal', function () {
                player.pause();
            });
        }
    });
});

// Detener videos al cerrar el modal
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', () => stopVideo(modal));
});
