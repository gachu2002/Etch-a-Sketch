// Initialize constants
const DEFAULT_SIZE = 30;

// Declare board variables
const board = document.querySelector('.board');
let width = board.offsetWidth;
let size = DEFAULT_SIZE;

// Function to create board
const createBoard = () => {
    board.innerHTML = '';
    for(let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.style.display = 'flex';
        board.appendChild(row);
        for(let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `${width / size}px`;
            square.style.height = `${width / size}px`;
            row.appendChild(square);
        }
    }
}
//function to change color of square when mouse is down using delegation
board.addEventListener('mouseover', (e) => {
    if(isMouseDown) {
        if(mode === 'color') {
            changeColor(e, color);
        } else if(mode === 'rainbow') {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            changeColor(e, `#${randomColor}`);
        } else if(mode === 'eraser') {
            color = DEFAULT_COLOR;
            changeColor(e, color);
        }
    }
});
createBoard();

// Declare mode variables
const modes = ['color', 'rainbow', 'eraser'];
let mode = modes[0];
const DEFAULT_COLOR = window.getComputedStyle(board).backgroundColor||'#1f211f';
let color = DEFAULT_COLOR;

// Add mode change event listeners to buttons
const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach(button => {
    button.addEventListener('click',() => {
        switch(button.getAttribute('id')) {
            case 'color':
                mode = modes[0];
                break;
            case 'rainbow':
                mode = modes[1];
                break;
            case 'eraser':
                mode = modes[2];
                break;
        }
    })
});
// Update the color mode vlaue when a new color is picked
document.addEventListener('DOMContentLoaded', (e) => {
    const colorPicker = document.querySelector('#color-picker');
    colorPicker.addEventListener('input', (e) => {
        color = e.target.value;
    });
});

// Function to change color of square
const changeColor = (e, color) => {
    e.target.style.backgroundColor = color;
}

//Flag to see if mouse is down
let isMouseDown = false;
// Set the mouse down state when the mouse is pressed
document.addEventListener('mousedown', () => {
    isMouseDown = true;
});
// Reset the mouse down state when the mouse is released
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Add eventListener to reset the board
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
    size = DEFAULT_SIZE;
    createBoard();
});

// Add eventListener to change the size of the board
const sizeButton = document.querySelector('#size');
sizeButton.addEventListener('click', () => {
    let newSize = prompt('Enter the size of the board (max 100):');
    newSize = parseInt(newSize);
    if (isNaN(newSize) || newSize <= 0) {
        alert('Invalid size. Please enter a number between 1 and 100.');
        return;
    }
    size = Math.min(newSize, 100);
    createBoard();
});