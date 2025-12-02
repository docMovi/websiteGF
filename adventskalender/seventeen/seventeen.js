document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle');
    const size = 4;
    const tiles = [];

    // Initialize the tiles
    for (let i = 0; i < size * size - 1; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.backgroundImage = `url('seventeen/p${i + 1}.png')`;
        tile.dataset.index = i;
        tiles.push(tile);
    }

    // Add the empty tile
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('tile', 'empty');
    tiles.push(emptyTile);

    // Shuffle the tiles
    shuffleTiles(tiles);

    // Add the tiles to the puzzle container
    tiles.forEach(tile => {
        puzzleContainer.appendChild(tile);
    });

    // Add event listeners
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            moveTile(tile);
        });
    });

    function shuffleTiles(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function moveTile(tile) {
        const tileIndex = tiles.indexOf(tile);
        const emptyIndex = tiles.indexOf(emptyTile);

        const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - size, emptyIndex + size];
        if (validMoves.includes(tileIndex)) {
            [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
            puzzleContainer.innerHTML = '';
            tiles.forEach(tile => {
                puzzleContainer.appendChild(tile);
            });
        }
    }
});
