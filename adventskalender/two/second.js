document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const movingImage = document.getElementById('movingImage');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const images = ['spriteOne.png', 'spriteTwo.png', 'spriteThree.png', 'spriteFour.png']; // Array of image sources
    const bombImageSrc = 'bomb.png'; // Image source for the bomb
    let score = 0;
    let rounds = 0;
    let timer = 5; // Initial timer value
    let timerInterval;

    function getRandomPosition() {
        const maxWidth = gameArea.clientWidth - movingImage.clientWidth;
        const maxHeight = gameArea.clientHeight - movingImage.clientHeight;
        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);
        return { x: randomX, y: randomY };
    }

    function updateScore() {
        scoreElement.innerText = score;
    }

    function updateTimer() {
        timerElement.innerText = timer;
    }

    function endGame() {
        clearInterval(timerInterval);
        alert('Verkackt! Du hast grad mal: ' + score + ' geschafft.');
        window.location.reload(); // Reload the page to reset the game
    }

    function moveImage() {
        if (rounds >= 5 && Math.random() < 0.3) {
            // 30% chance to spawn a bomb after 5 rounds
            spawnBomb();
            const newPosition = getRandomPosition();
            movingImage.style.left = newPosition.x + 'px';
            movingImage.style.top = newPosition.y + 'px';

            // Change the image source randomly
            const randomImage = images[Math.floor(Math.random() * images.length)];
            movingImage.src = randomImage;

            score++;
            rounds++;
            updateScore();

            // Reset timer for the next image
            if(rounds >= 20){
                timer = 3;
            }
            else{
                timer = 5;
            }
            
            updateTimer();
        } else {
            const newPosition = getRandomPosition();
            movingImage.style.left = newPosition.x + 'px';
            movingImage.style.top = newPosition.y + 'px';

            // Change the image source randomly
            const randomImage = images[Math.floor(Math.random() * images.length)];
            movingImage.src = randomImage;

            score++;
            rounds++;
            updateScore();

            // Reset timer for the next image
            if(rounds >= 20){
                timer = 3;
            }
            else{
                timer = 5;
            }
            updateTimer();
        }
    }

    function spawnBomb() {
        const bomb = document.createElement('img');
        bomb.src = bombImageSrc;
        bomb.classList.add('bomb');

        const bombPosition = getRandomPosition();
        bomb.style.left = bombPosition.x + 'px';
        bomb.style.top = bombPosition.y + 'px';

        gameArea.appendChild(bomb);

        bomb.addEventListener('click', function() {
            endGame();
        });

        // Remove bomb after it spawns a new image
        setTimeout(() => bomb.remove(), 1000);
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

    movingImage.addEventListener('click', moveImage);
    
    // Initialize the image position and start the timer
    moveImage();
    startTimer();
});
