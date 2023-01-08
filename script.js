const canvas = document.querySelector('#canvas');
let numberOfSquares = 16;
canvas.setAttribute('style', 
`grid-template-columns: repeat(${numberOfSquares}, 1fr);
grid-auto-rows: 1fr;`);

for (let i = 0; i < (Math.pow(numberOfSquares, 2)); i++) {
    const pixels = document.createElement('div');
    pixels.classList.add('pixels');
    canvas.appendChild(pixels);
}