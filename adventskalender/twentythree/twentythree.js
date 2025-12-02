document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const gameBoardSize = 500;
    const cellSize = 20;
    const initialSnake = [
        { x: 3, y: 3, img: 'head.png' },
        { x: 2, y: 3, img: 'body.png' },
        { x: 1, y: 3, img: 'tail.png' }
    ];
    
    let snake = [...initialSnake];
    let direction = { x: 1, y: 0 };
    let food = generateFood();
    let gameInterval;
    let score = 0;

    const scoreElement = document.getElementById('score');

    function createSegment(segment) {
        const segmentElement = document.createElement('img');
        segmentElement.src = `twentythree/${segment.img}`;
        segmentElement.style.left = `${segment.x * cellSize}px`;
        segmentElement.style.top = `${segment.y * cellSize}px`;
        gameBoard.appendChild(segmentElement);
    }

    function renderSnake() {
        gameBoard.innerHTML = '';
        snake.forEach((segment, index) => {
            if (index === 0) {
                segment.img = 'head.png';
            } else if (index === snake.length - 1) {
                segment.img = 'tail.png';
            } else {
                segment.img = 'body.png';
            }
            createSegment(segment);
        });
        createSegment(food);
    }

    function generateFood() {
        let foodX, foodY;
        do {
            foodX = Math.floor(Math.random() * (gameBoardSize / cellSize));
            foodY = Math.floor(Math.random() * (gameBoardSize / cellSize));
        } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
        
        return { x: foodX, y: foodY, img: 'food.png' };
    }

    function moveSnake() {
        const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y, img: 'head.png' };
        snake.unshift(newHead);
        
        if (newHead.x === food.x && newHead.y === food.y) {
            food = generateFood();
            score++;
            scoreElement.innerText = score;
        } else {
            snake.pop();
        }

        if (checkCollision(newHead)) {
            clearInterval(gameInterval);
            alert('Game Over!');
            return;
        }

        renderSnake();
    }

    function checkCollision(head) {
        return (
            head.x < 0 || head.x >= gameBoardSize / cellSize ||
            head.y < 0 || head.y >= gameBoardSize / cellSize ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    function changeDirection(event) {
        const { key } = event;
        if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
        if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
        if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
        if (key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
        
        // Prevent default action for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            event.preventDefault();
        }
    }

    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(moveSnake, 200);
    renderSnake();
});
