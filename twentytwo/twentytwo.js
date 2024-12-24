const words = ["LIEBE", "HALLO", "APFEL", "HEISS", "TRAUM"]; // Array of words
const targetWord = words[Math.floor(Math.random() * words.length)]; // Select a random word
let attempts = 5; // Number of allowed attempts

const grid = document.querySelector('.grid');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');

// Create the grid for displaying guesses
for (let i = 0; i < attempts * attempts; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
}

// Handle guess submission
guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    if (guess.length !== 5) {
        alert("Wörter müssen 5 Buchstaben haben");
        return;
    }

    const cells = grid.querySelectorAll('div');
    const startIdx = (attempts - 1) * 5;
    
    for (let i = 0; i < 5; i++) {
        const cell = cells[startIdx + i];
        cell.textContent = guess[i];

        if (guess[i] === targetWord[i]) {
            cell.style.backgroundColor = '#28a745'; // Correct position
        } else if (targetWord.includes(guess[i])) {
            cell.style.backgroundColor = '#ffc107'; // Correct letter, wrong position
        } else {
            cell.style.backgroundColor = '#dc3545'; // Wrong letter
        }
    }

    attempts--;
    if (guess === targetWord) {
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (attempts === 0) {
        alert(`Verkackt!`);
        guessButton.disabled = true;
        guessInput.disabled = true;
    }

    guessInput.value = '';
});

console.log(`The target word is: ${targetWord}`); // For debugging
