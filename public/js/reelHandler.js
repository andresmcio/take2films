document.addEventListener("DOMContentLoaded", function() {
    const playButton1 = document.querySelector(".play-btn1");
    const videoContainer1 = document.querySelector(".vid-cntr1");
    const playButton2 = document.querySelector(".play-btn2");
    const videoContainer2 = document.querySelector(".vid-cntr2");

    playButton1.addEventListener("click", function() {
        videoContainer1.innerHTML = `
            <iframe class="reel" src="https://player.vimeo.com/video/968320891?autoplay=1&byline=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        `;
    });

    playButton2.addEventListener("click", function() {
        videoContainer2.innerHTML = `
            <iframe class="reel" src="https://player.vimeo.com/video/1212545981?autoplay=1&byline=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        `;
    });
});