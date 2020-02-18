const Inputs = {
    arrowUp:    false,
    arrowRight: false,
    arrowDown:  false,
    arrowLeft:  false,
    space:      false,
    escape:     false,
    p:          false,
};

export default Inputs;

document.addEventListener("keydown", function (event) {
    switch (event.code) {
        case 'ArrowUp':    Inputs.arrowUp = true;    break;
        case 'ArrowRight': Inputs.arrowRight = true; break;
        case 'ArrowDown':  Inputs.arrowDown = true;  break;
        case 'ArrowLeft':  Inputs.arrowLeft = true;  break;
        case 'Space':      Inputs.space = true;      break;
        case 'Escape':     Inputs.escape = true;     break;
        case 'KeyP':       Inputs.p = true;          break;
    }
});

document.addEventListener("keyup", function (event) {
    switch (event.code) {
        case 'ArrowUp':    Inputs.arrowUp = false;    break;
        case 'ArrowRight': Inputs.arrowRight = false; break;
        case 'ArrowDown':  Inputs.arrowDown = false;  break;
        case 'ArrowLeft':  Inputs.arrowLeft = false;  break;
        case 'Space':      Inputs.space = false;      break;
        case 'Escape':     Inputs.escape = false;     break;
        case 'KeyP':       Inputs.p = false;          break;
    }
});
