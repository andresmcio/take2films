document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const videoType = modal.getAttribute('data-video-type');
        const videoId = modal.getAttribute('data-video-id');
        const iframe = modal.querySelector('iframe');

        if (videoType === 'youtube') {
            iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

            modal.addEventListener('show.bs.modal', function () {
                playYouTubeVideo(iframe);
            });

            modal.addEventListener('hidden.bs.modal', function () {
                stopYouTubeVideo(iframe);
            });
        } else if (videoType === 'vimeo') {
            iframe.src = `https://player.vimeo.com/video/${videoId}`;
            const player = new Vimeo.Player(iframe);

            modal.addEventListener('show.bs.modal', function () {
                player.play().catch(function(error) {
                    console.error('Error playing the video:', error);
                });
            });

            modal.addEventListener('hidden.bs.modal', function () {
                player.pause().catch(function(error) {
                    console.error('Error pausing the video:', error);
                });
            });
        }
    });
});

function playYouTubeVideo(iframe) {
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

function stopYouTubeVideo(iframe) {
    iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}

