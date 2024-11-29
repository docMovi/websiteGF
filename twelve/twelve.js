const wordList = [{word: "liebe"}, {word: "hosenscheisser"}, {word: "aufmweg"},
    {word: "kinderkrippe"}, {word: "kopfweh"}, {word: "vegetetarisch"}, {word: "bauwagen"}, {word: "gummistiefel"},
    {word: "schatz"}, {word: "rasenschach"},  {word: "xhamster"},  {word: "tanzschuhe"}, {word: "stricken"}, {word: "kastenbier"},
    {word: "gymnasium"}, {word: "fortnite"}, {word: "masturbieren"}, {word: "ausziehen"}, {word: "jesuschristus"}, {word: "abibier"},
    {word: "weikershof"},
];
//wörter klein schreiben

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".man img");
const gameModal = document.querySelector(".hang_content");
const playAgainBtn = gameModal.querySelector("button.retry");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "twelve/images/hangman-0.jpg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word 
    const {word} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `` : 'Richtig wäre:';
    gameModal.querySelector("img").src = `twelve/images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Geschafft!' : 'Verkackt!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `twelve/images/hangman-${wrongGuessCount}.jpg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
