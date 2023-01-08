const canvas = document.querySelector('#canvas');
const colorModeButton = document.querySelector('#colorModeButton');
const rainbowModeButton = document.querySelector('#rainbowModeButton');
const eraseModeButton = document.querySelector('#eraseModeButton');
let pixels;
let randomColor;
let numberOfSquares = 16;


//Create divs to represent each pixel
//Change the canvas dimensions accoriding to the chosen # of squares
function createGrid(numberOfSquares) {
    //Make grid dimensions match numberOfSquares and slign pixels accordingly
    canvas.setAttribute('style', 
    `grid-template-columns: repeat(${numberOfSquares}, 1fr);
    grid-auto-rows: 1fr;`);
    
    //Create desired amount of pixels 
    for (let i = 0; i < (Math.pow(numberOfSquares, 2)); i++) {
        const pixels = document.createElement('div');
        pixels.classList.add('pixels');
        canvas.appendChild(pixels);
    };

    //Updates pixel nodelist and calls paintPixel function
    pixels = document.querySelectorAll('.pixels');
    colorMode(pixels);
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

//Use specific paint mode if mouse is down
let isMouseDown = false;

window.addEventListener("mousedown", () => {
    isMouseDown = true;
});
window.addEventListener("mouseup", () => {
    isMouseDown = false;
});

//When color mode button is pressed, color mode function is called
colorModeButton.addEventListener('click', () => {
    colorMode(pixels);
})

function colorMode(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.classList.remove('rainbowPixel');
                pixel.classList.add('colouredPixel');
            }
        });
    });
};

//When erase mode button is pressed, erase mode function is called
eraseModeButton.addEventListener('click', () => {
    eraseMode(pixels);
})

function eraseMode(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.classList.remove('colouredPixel');
                pixel.classList.remove('rainbowPixel');
            }
        });
    });
};

//Random Color mode
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

rainbowModeButton.addEventListener('click', () => {
    rainbowMode(pixels);
});

function rainbowMode(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.classList.remove('colouredPixel');
                pixel.classList.add('rainbowPixel');
                pixel.style.backgroundColor = getRandomColor();
            }
        });
    });
}

