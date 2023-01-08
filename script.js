const canvas = document.querySelector('#canvas');
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
}
createGrid(numberOfSquares);
//Paint the pixels if mouse is down.
const pixels = document.querySelectorAll('.pixels');
let isMouseDown = false;
window.addEventListener("mousedown", () => {
    isMouseDown = true;
});

window.addEventListener("mouseup", () => {
    isMouseDown = false;
});

pixels.forEach((pixel) => {
    pixel.addEventListener('mousemove', () => {
        if (isMouseDown) {
            pixel.classList.add('colouredPixel');
        }
    });
});


