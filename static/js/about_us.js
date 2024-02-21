window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector("header");

    if (currentScroll > 0) {
        let opacity = 1 - (currentScroll / header.offsetHeight);
        header.style.opacity = opacity >= 0 ? opacity : 0;

        // Set pointer events based on the opacity
        header.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
    } else {
        header.style.opacity = 1;
        header.style.pointerEvents = 'auto';
    }
}, false);