document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const pickButton = document.getElementById('pick');
    let tries = 0;

    pickButton.addEventListener('click', () => {
        if (tries >= 2) return; // Prevent more than two tries

        options.forEach(option => option.style.backgroundColor = '#f7e1da'); // Reset colors
        let current = 0;
        const interval = setInterval(() => {
            options[current].style.backgroundColor = '#f7e1da'; // Reset current color
            current = (current + 1) % options.length;
            options[current].style.backgroundColor = '#ff0000'; // Highlight current option
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const chosenIndex = Math.floor(Math.random() * options.length);
            options.forEach(option => option.style.backgroundColor = '#f7e1da'); // Reset all colors
            options[chosenIndex].style.backgroundColor = '#00ff00'; // Highlight the chosen option
            tries++; // Increment the try counter
            if (tries === 1) {
                pickButton.textContent = "Try Again"; // Change button text on the second try
            }
            if (tries === 2) {
                pickButton.disabled = true; // Disable the button after the second try
                pickButton.textContent = "eingelockt!"; // Final button text
            }
        }, 3000); // Duration of the animation
    });
});
