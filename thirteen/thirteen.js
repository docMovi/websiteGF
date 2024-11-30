let score = 0;
let directionX = 1;
let directionY = 1;
let posX = 0;
let posY = 0;
const speed = 5;
let timer = 5; // Initial timer value
let timerInterval;

const aimDiv = document.querySelector('.aim');
const gameWindow = document.querySelector('.game-window');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Function to generate random size
const getRandomSize = () => {
    const size = Math.floor(Math.random() * 100) + 50; // Size between 50 and 150px
    return size;
};

// Function to generate random position
const getRandomPosition = () => {
    const windowWidth = gameWindow.clientWidth;
    const windowHeight = gameWindow.clientHeight;
    const randomX = Math.floor(Math.random() * (windowWidth - aimDiv.clientWidth));
    const randomY = Math.floor(Math.random() * (windowHeight - aimDiv.clientHeight));
    return { x: randomX, y: randomY };
};

// Function to move the target smoothly
const moveTarget = () => {
    const windowWidth = 800;
    const windowHeight = 600;

    posX += directionX * speed;
    posY += directionY * speed;

    if (posX + aimDiv.clientWidth >= windowWidth || posX <= 0) {
        directionX *= -1; // Change direction on X axis
    }

    if (posY + aimDiv.clientHeight >= windowHeight || posY <= 0) {
        directionY *= -1; // Change direction on Y axis
    }

    aimDiv.style.left = `${posX}px`;
    aimDiv.style.top = `${posY}px`;

    requestAnimationFrame(moveTarget);
};

// Function to update score and reposition the target
const updateScore = () => {
    score += 1;
    timer = 5;
    updateTimer();
    updateSc();
    const size = getRandomSize();
    const { x, y } = getRandomPosition();
    aimDiv.style.width = `${size}px`;
    aimDiv.style.height = `${size}px`;
    posX = x;
    posY = y;
    aimDiv.style.left = `${posX}px`;
    aimDiv.style.top = `${posY}px`;
 
};

function updateSc() {
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

function startTimer() {
    timerInterval = setInterval(function() {
        timer--;
        updateTimer();

        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

// Initial setup
const size = getRandomSize();
aimDiv.style.width = `${size}px`;
aimDiv.style.height = `${size}px`;
const initialPosition = getRandomPosition();
posX = initialPosition.x;
posY = initialPosition.y;
aimDiv.style.left = `${posX}px`;
aimDiv.style.top = `${posY}px`;
moveTarget();
startTimer();

// Event listener for clicking on the target
aimDiv.addEventListener('click', updateScore);
