document.addEventListener('DOMContentLoaded', function() {
    const imgs = ['eight/flower1.png', 'eight/flower2.png', 'eight/flower3.png', 'eight/flower4.png', 'eight/flower5.png', 'eight/flower6.png', 'eight/flower7.png', 'eight/flower8.png',];
    let i = 0;

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent the default action (scrolling down)
            add();
        }
    });

    function add() {
        if (i < imgs.length) {
            const img = document.createElement('img');
            img.src = imgs[i];
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.zIndex = i; // Ensuring each new image is layered on top
            document.querySelector('.blume').appendChild(img);
            i++;
        }
    }
});
