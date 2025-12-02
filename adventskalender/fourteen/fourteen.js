let stage = 0;
let pressCount = 0;
let scale = 1;
const maxScale = 1.5; // Maximum scale before switching to the next stage
const scaleIncrement = 0.1; // Scale increment per pump

const balloon = document.getElementById('balloon');
const pumpButton = document.getElementById('pumpButton');
const pumpImage = document.getElementById('pumpImage');

const stages = ['fourteen/stage0.png', 'fourteen/stage1.png', 'fourteen/stage2.png', 'fourteen/stage3.png'];
const pumpStates = ['fourteen/luft0.png', 'fourteen/luft1.png'];
const stageSounds = [
    new Audio('fourteen/sound0.wav'),
    new Audio('fourteen/sound1.wav'),
    new Audio('fourteen/sound2.wav'),
    new Audio('fourteen/boom.wav')
];

pumpButton.addEventListener('mousedown', () => {
    if (stage < stages.length - 1) {
        pumpImage.src = pumpStates[1];
        pressCount++;

        // Increase the scale gradually
        scale += scaleIncrement;
        if (scale > maxScale) {
            scale = 1; // Reset scale for next stage
            stage = Math.min(stage + 1, stages.length - 1);
            balloon.src = stages[stage];
            stageSounds[stage].play(); // Play sound for the current stage
        } else {
            stageSounds[stage].play(); // Play sound for the current stage
        }
        balloon.style.transform = `scale(${scale})`;

        // Disable pump button if balloon breaks
        if (stage === stages.length - 1) {
            pumpButton.disabled = true;
            pumpButton.style.cursor = 'not-allowed';
        }
    }
});

pumpButton.addEventListener('mouseup', () => {
    pumpImage.src = pumpStates[0];
});
