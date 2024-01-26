const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridWidth = 8;
const gridHeight = 8;
const cellSize = 60;
const cellMargin = 2;

const colors = ['#ff6663', '#ffcccc', '#ffff99', '#ffff66', '#66ff66', '#66ffff'];

class Cell {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    draw() {
        ctx.fillStyle = colors[this.value];
        ctx.fillRect(
            this.x * cellSize + cellMargin,
            this.y * cellSize + cellMargin,
            cellSize - 2 * cellMargin,
            cellSize - 2 * cellMargin
        );
        ctx.strokeStyle = '#000';
        ctx.strokeRect(
            this.x * cellSize + cellMargin,
            this.y * cellSize + cellMargin,
            cellSize - 2 * cellMargin,
            cellSize - 2 * cellMargin
        );
    }
}

const cells = [];
for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
        cells.push(new Cell(x, y, Math.floor(Math.random() * colors.length)));
    }
}

function drawGrid() {
    cells.forEach(cell => cell.draw());
}

let selectedCells = [];

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / (cellSize + 2 * cellMargin));
    const y = Math.floor((event.clientY - rect.top) / (cellSize + 2 * cellMargin));

    const cell = cells.find(c => c.x === x && c.y === y);
    if (cell && !selectedCells.includes(cell)) {
        selectedCells.push(cell);
        cell.draw();
    }

    if (selectedCells.length === 3) {
        const [a, b, c] = selectedCells;
        if (a.value === b.value && b.value === c.value) {
            // Perform a 3-match action
            // For example, remove the matched cells
            cells.splice(cells.indexOf(a), 1);
            cells.splice(cells.indexOf(b), 1);
            cells.splice(cells.indexOf(c), 1);

            // Refill the grid
            for (let i = cells.length; i < gridWidth * gridHeight; i++) {
                cells.push(new Cell(i % gridWidth, Math.floor(i / gridWidth), Math.floor(Math.random() * colors.length)));
            }
        }

        // Clear the selected cells
        selectedCells = [];
    }
});

drawGrid();