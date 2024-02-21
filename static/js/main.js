

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


document.getElementById('btn-individuals').addEventListener('click', function() {
    document.getElementById('individuals').style.display = 'block';
    document.getElementById('company').style.display = 'none';
});

document.getElementById('btn-company').addEventListener('click', function() {
    document.getElementById('company').style.display = 'block';
    document.getElementById('individuals').style.display = 'none';
});


document.addEventListener("DOMContentLoaded", function() {
            
    document.getElementById('btn-company').click();
});


document.querySelectorAll('#discover button').forEach(button => {
    button.addEventListener('click', function() {
        
        document.querySelectorAll('#discover button').forEach(btn => btn.classList.remove('active'));

        
        this.classList.add('active');
    });
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    document.querySelector('.program-box-container').scrollBy({ 
        left: 300, 
        behavior: 'smooth' 
    });
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    document.querySelector('.program-box-container').scrollBy({ 
        left: -300, 
        behavior: 'smooth' 
    });
});