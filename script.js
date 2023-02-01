//Initialise nesccerary variables at page load
const canvas = document.querySelector('#canvas');
const colorValueSelector = document.querySelector('input[type="color"]');
const colorModeButton = document.querySelector('#color-mode-button');
const greyscaleModeButton = document.querySelector('#greyscale-mode-button');
const rainbowModeButton = document.querySelector('#rainbow-mode-button');
const eraseModeButton = document.querySelector('#erase-mode-button');
const gridDimensionsButton = document.querySelector('#grid-size-button');
let pixels;
let paintColor = colorValueSelector.value;
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
        pixels = document.createElement('div');
        pixels.classList.add('pixels');
        canvas.appendChild(pixels);
    };

    //Updates pixel nodelist and calls paintPixel function
    pixels = document.querySelectorAll('.pixels');
    colorMode(paintColor);
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

window.addEventListener("touchstart", () => {
    isMouseDown = true;
});
window.addEventListener("touchend", () => {
    isMouseDown = false;
});

//Function for mode button use
function modeButton (button, modeFunction) {
    button.addEventListener('click', () => {
        modeFunction();
    })
}
//touchmove
modeButton(colorModeButton, colorMode);

function colorMode() {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            paintColor = colorValueSelector.value;
            if (isMouseDown) {
                pixel.style.backgroundColor = paintColor;
            }
        });
        pixel.addEventListener('touchmove', () => {
            paintColor = colorValueSelector.value;
            if (isMouseDown) {
                pixel.style.backgroundColor = paintColor;
            }
        });
    });
};

//When erase mode button is pressed, erase mode function is called
modeButton(eraseModeButton, eraseMode);

function eraseMode() {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.style.backgroundColor = 'white';
            }
        });
    });
};

//Changes mode to rainbow
modeButton(rainbowModeButton, rainbowMode);

//Generates a random hex decimal
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//Gets a random color and changes background of each pixel to that color
function rainbowMode() {
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.style.backgroundColor = getRandomColor();
            }
        });
    });
}
// Button changes to grey scale mode which increases the opacity of black by 10% each time mouse is over pixel
modeButton(greyscaleModeButton, greyscaleMode);

function greyscaleMode() {
    pixels.forEach((pixel) => {
        let defultOpacity = 0;
        pixel.addEventListener('mousemove', () => {
            if (isMouseDown) {
                pixel.style.backgroundColor = `rgba(0, 0, 0, ${defultOpacity += 0.1})`;
            }
        });
    });
}

