document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('bt');
    const img = document.getElementById('img');
    const text = document.getElementById('text');
    const imgs = ['three/man.png', 'three/woman.png'];
    const timerElement = document.getElementById('timer');
    let timer = 3;
    let timerInterval;

    button.addEventListener('click', changeImage)

    function changeImage(){
        img.src = imgs[1];
        text.classList.remove('highlight');
        startTimer();
    }

    function updateTimer() {
        timerElement.innerText = timer;
    }

    function endGame(){
        img.src = imgs[0];
        clearInterval(timerInterval); 
        text.classList.add('highlight');
        timer = 1;
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            timer--;
            updateTimer();

            if (timer <= 0) {
                endGame();
            }
        }, 1000);
    }

    // Initialize the timer display
    updateTimer();
});
