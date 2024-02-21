document.addEventListener('DOMContentLoaded', function() {
    var boxes = document.querySelectorAll('.opportunity-box');
    var activeLine = document.querySelector('.active-line');

    boxes.forEach(function(box, index) {
        box.addEventListener('click', function() {
            
            boxes.forEach(b => b.classList.remove('active'));

            
            box.classList.add('active');

            
            activeLine.style.transform = 'translateX(' + (index * 100) + '%)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var boxes = document.querySelectorAll('.opportunity-box');
    boxes.forEach(function(box) {
        box.addEventListener('click', function() {
            boxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var opportunityBoxes = document.querySelectorAll('.opportunity-box');
    var contentSections = document.querySelectorAll('.category-content');
    opportunityBoxes.forEach(function(box, index) {
        box.addEventListener('click', function() {
            contentSections.forEach(function(section) {
                section.style.display = 'none';
            });
            var targetId = 'category' + (index + 1); 
            document.getElementById(targetId).style.display = 'block';
        });
    });
});


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


document.addEventListener('DOMContentLoaded', function() {
    var contentBoxes = document.querySelectorAll('.content-box');

    contentBoxes.forEach(function(box) {
        box.addEventListener('click', function() {
            contentBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
        });
    });
});