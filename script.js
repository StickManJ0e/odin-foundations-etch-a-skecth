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

const pixels = document.querySelectorAll('.pixels');
pixels.forEach((pixel) => {
    pixel.addEventListener('mousemove', () => {
        pixel.classList.add('colouredPixel');
    });
})
