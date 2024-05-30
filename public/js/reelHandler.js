document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.querySelector(".play-button");
    const videoContainer = document.querySelector(".video-container");

    playButton.addEventListener("click", function() {
        videoContainer.innerHTML = `
            <iframe class="reel" src="https://player.vimeo.com/video/943843741?h=b541312423&autoplay=1&byline=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        `;
    });
});