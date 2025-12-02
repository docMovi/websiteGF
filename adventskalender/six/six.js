document.addEventListener('DOMContentLoaded', function() {
    const game = document.getElementById('game');
    const player = document.getElementById('player');
    const scoreElement = document.getElementById('score');
    let score = 0;
    let isJumping = false;
    let isFalling = false;
    let playerBottom = 10;
    let jumpSpeed = 5;
    let fallSpeed = 3;
    let jumpHeight = 0;
    let obstacleSpeed = 10; // Initial obstacle speed
    const maxJumpHeight = 100;

    function updateScore() {
        scoreElement.innerText = score;
    }

    function endGame() {
        location.reload();
    }

    function jump() {
        if (isJumping || isFalling) return;
        isJumping = true;
        let jumpInterval = setInterval(() => {
            if (jumpHeight < maxJumpHeight && !isFalling) {
                playerBottom += jumpSpeed;
                player.style.bottom = playerBottom + 'px';
                jumpHeight += jumpSpeed;
            } else {
                clearInterval(jumpInterval);
                fall();
            }
        }, 20);
    }

    function fall() {
        isJumping = false;
        isFalling = true;
        let fallInterval = setInterval(() => {
            if (playerBottom > 10) {
                playerBottom -= fallSpeed;
                player.style.bottom = playerBottom + 'px';
            } else {
                clearInterval(fallInterval);
                isFalling = false;
                jumpHeight = 0;
            }
        }, 20);
    }

    function createObstacle() {
        const obstacle = document.createElement('img');
        obstacle.src = 'six/obstacle.jpg'; // Path to your obstacle image
        obstacle.classList.add('obstacle');
        game.appendChild(obstacle);
        obstacle.style.left = game.clientWidth + 'px';
        
        let obstacleLeft = game.clientWidth;
        
        const moveObstacle = setInterval(() => {
            if (obstacleLeft < -50) {
                clearInterval(moveObstacle);
                game.removeChild(obstacle);
            } else if (obstacleLeft > 50 && obstacleLeft < 100 && playerBottom < 60) {
                clearInterval(moveObstacle);
                location.reload(); // Reload the page when an obstacle is hit
            } else {
                obstacleLeft -= obstacleSpeed;
                obstacle.style.left = obstacleLeft + 'px';
            }
        }, 20);
    }

    function createCoin() {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        game.appendChild(coin);
        coin.style.left = game.clientWidth + 'px';
        coin.style.bottom = `${Math.random() * 80 + 10}px`; // Ensuring the coin is reachable

        let coinLeft = game.clientWidth;

        const moveCoin = setInterval(() => {
            if (coinLeft < -50) {
                clearInterval(moveCoin);
                game.removeChild(coin);
            } else if (
                coinLeft > 50 && coinLeft < 100 &&
                player.getBoundingClientRect().bottom >= coin.getBoundingClientRect().top &&
                player.getBoundingClientRect().top <= coin.getBoundingClientRect().bottom &&
                player.getBoundingClientRect().right >= coin.getBoundingClientRect().left &&
                player.getBoundingClientRect().left <= coin.getBoundingClientRect().right
            ) {
                score++;
                updateScore();
                game.removeChild(coin);
                clearInterval(moveCoin);
            } else {
                coinLeft -= obstacleSpeed;
                coin.style.left = coinLeft + 'px';
            }
        }, 20);

        setTimeout(() => {
            if (game.contains(coin)) {
                game.removeChild(coin);
                clearInterval(moveCoin);
            }
        }, 5000); // Remove coin if not collected within 5 seconds
    }

    function startGame() {
        gameInterval = setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance to spawn a coin
                createCoin();
            } else {
                createObstacle();
            }

            // Increase speed based on score milestones
            if (score >= 15) {
                obstacleSpeed = 20;
            } else if (score >= 5) {
                obstacleSpeed = 15;
            }
        }, 2000);
    }

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            jump();
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
            isFalling = true;
        }
    });

    startGame();
});
