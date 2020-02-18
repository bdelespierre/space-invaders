import Box from './box.js';

export default class Canvas {
    #innerBox;

    constructor(elem) {
        // HTML <canvas> DOMElement
        this.elem = elem;

        // context
        this.ctx = elem.getContext('2d');

        // initialize
        this.reset();
    }

    reset() {
        // items to draw
        this.items = [];

        return this;
    }

    setBackground(background) {
        this.background = background;

        return this;
    }

    add(item) {
        item.canvas = this;
        this.items.push(item);

        return this;
    }

    remove(item) {
        let offset = this.items.indexOf(item);

        if (offset != -1) {
            this.items.splice(offset, 1);
            delete item.canvas;
        }

        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);

        return this;
    }

    update(delta) {
        this.items.forEach(
            item => item.update(delta)
        );

        return this;
    }

    draw(interp) {
        if (this.background) {
            this.background.draw(this.ctx, interp);
        }

        this.items.forEach(
            item => item.draw(this.ctx, interp)
        );

        return this;
    }

    drawCrosshair(color) {
        this.ctx.strokeStyle = color || "red";
        this.ctx.beginPath();

        this.ctx.moveTo(Math.round(this.elem.width / 2), 0);
        this.ctx.lineTo(Math.round(this.elem.width / 2), this.elem.height);

        this.ctx.moveTo(0, Math.round(this.elem.height / 2));
        this.ctx.lineTo(this.elem.width, Math.round(this.elem.height / 2));

        this.ctx.stroke();

        return this;
    }
}
