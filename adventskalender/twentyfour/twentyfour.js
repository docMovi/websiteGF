document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('characterImage');
    const hungerBar = document.getElementById('hungerBar');
    const cleanlinessBar = document.getElementById('cleanlinessBar');
    const happinessBar = document.getElementById('happinessBar');
    const playButton = document.getElementById('playButton');
    const flappyGame = document.querySelector('.flappyGame');
    const flappyCanvas = document.getElementById('flappyCanvas');
    const exitButton = document.getElementById('exitButton');

    let hunger = 100;
    let cleanliness = 100;
    let happiness = 100;
    let gameActive = false;
    let cooldownActive = false;
    let temp = 0;

    const updateBars = () => {
        hungerBar.style.width = `${hunger}%`;
        cleanlinessBar.style.width = `${cleanliness}%`;
        happinessBar.style.width = `${happiness}%`;
        updateCharacterImage();
    };

    const updateCharacterImage = () => {
        if (hunger < 75) {
            character.src = 'twentyfour/character_hungry.png';
        } else if (cleanliness < 60) {
            character.src = 'twentyfour/character_dirty.png';
        } else if (happiness < 65) {
            character.src = 'twentyfour/character_bored.png';
        } else {
            character.src = 'twentyfour/character.png';
        }
    };

    const feedCharacter = () => {
        hunger = Math.min(hunger + 10, 100);
        cleanliness = Math.max(cleanliness - 5, 0);
        updateBars();
    };

    const cleanCharacter = () => {
        cleanliness = Math.min(cleanliness + 10, 100);
        happiness = Math.max(happiness - 5, 0);
        updateBars();
    };

    const playWithCharacter = () => {
        happiness = Math.min(happiness + 10, 100);
        hunger = Math.max(hunger - 5, 0);
        updateBars();
    };

    const makeDraggable = (item, action) => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });

        character.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        character.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            if (id === item.id) {
                action();
            }
        });
    };

    const apple = document.getElementById('apple');
    const sponge = document.getElementById('sponge');

    makeDraggable(apple, feedCharacter);
    makeDraggable(sponge, cleanCharacter);

    setInterval(() => {
        hunger = Math.max(hunger - 1, 0);
        cleanliness = Math.max(cleanliness - 1, 0);
        happiness = Math.max(happiness - 1, 0);
        updateBars();
    }, 1000);

    playButton.addEventListener('click', () => {
        if (!cooldownActive) {
            flappyGame.style.display = 'block';
            gameActive = true;
            playFlappyBird();
        }
    });

    exitButton.addEventListener('click', () => {
        flappyGame.style.display = 'none';
        gameActive = false;
    });

    updateBars();

    function playFlappyBird() {
        const ctx = flappyCanvas.getContext('2d');
        let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -10, velocity: 0 };
        let pipes = [];
        let frameCount = 0;
        let score = 0;
        let gameInterval;

        function drawBird() {
            ctx.fillStyle = '#ff0';
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        }

        function drawPipes() {
            ctx.fillStyle = '#0f0';
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
                ctx.fillRect(pipe.x, pipe.bottom, pipe.width, flappyCanvas.height - pipe.bottom);
            });
        }

        function updatePipes() {
            if (frameCount % 75 === 0) {
                let pipeHeight = Math.floor(Math.random() * (flappyCanvas.height - 200)) + 50;
                let gap = 100;
                pipes.push({ x: flappyCanvas.width, width: 20, top: pipeHeight, bottom: pipeHeight + gap });
            }
            pipes.forEach(pipe => {
                pipe.x -= 2;
            });
            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
        }

        function checkCollision() {
            let collision = pipes.some(pipe => {
                return bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && (bird.y < pipe.top || bird.y + bird.height > pipe.bottom);
            });
            collision = collision || bird.y + bird.height >= flappyCanvas.height || bird.y <= 0;
            return collision;
        }

        function updateGame() {
            ctx.clearRect(0, 0, flappyCanvas.width, flappyCanvas.height);
            drawBird();
            drawPipes();
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            updatePipes();

            if (checkCollision()) {
                clearInterval(gameInterval);
                flappyGame.style.display = 'none';
                gameActive = false;
                updateBars();
                startCooldown();
                happiness = happiness + score;
                return;
            }

            frameCount++;
            score++;
            temp = score;
        }

        function flap() {
            bird.velocity = bird.lift;
        }

        function startCooldown() {
            cooldownActive = true;
            playButton.disabled = true;
            setTimeout(() => {
                cooldownActive = false;
                playButton.disabled = false;
            }, 5000); // 5-second cooldown
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && gameActive) {
                flap();
                e.preventDefault();
            }
        });

        gameInterval = setInterval(updateGame, 30);
    }
});
