const canvas = document.querySelector('#canvas');
let pixels;
let numberOfSquares = 16;

//Create divs to represent each pixel
//Change the canvas dimensions accoriding to the chosen # of squares
function createGrid(numberOfSquares) {
    canvas.setAttribute('style', 
    `grid-template-columns: repeat(${numberOfSquares}, 1fr);
    grid-auto-rows: 1fr;`);
    
    for (let i = 0; i < (Math.pow(numberOfSquares, 2)); i++) {
        const pixels = document.createElement('div');
        pixels.classList.add('pixels');
        canvas.appendChild(pixels);
    };
    pixels = document.querySelectorAll('.pixels');
    paintPixels(pixels);
};
//Create grid at page load up with a defult of 16x16 pixels
createGrid(numberOfSquares);

//Delete Grid function
function deleteGrid(pixels) {
    pixels.forEach(pixel => {
        pixel.remove();
    })
};

//Change the grid size
const gridDimensionsButton = document.querySelector('#gridDimensionsButton');
gridDimensionsButton.addEventListener('click', () => {
    numberOfSquares = parseInt(prompt('What PixelxPixel Grid Size Do You Want?'));
    if (numberOfSquares > 100) {
        alert('Max Size is 100x100');
        deleteGrid(pixels);
        createGrid(100);
    }
    deleteGrid(pixels);
    createGrid(numberOfSquares);
});

//Paint the pixels if mouse is down.
let isMouseDown = false;

window.addEventListener("mousedown", () => {
    isMouseDown = true;
});
window.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function paintPixels(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.classList.add('colouredPixel');
            }
        });
    });
}



