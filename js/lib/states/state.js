export default class State {
    constructor(game) {
        this.game = game;
    }

    begin(timestamp, delta) {
        // noop
    }

    update(delta) {
        // noop
    }

    draw(interp) {
        // noop
    }

    end(fps, panic) {
        // noop
    }

    drawTitle(text) {
        let ctx = this.game.canvas.ctx;

        // title background
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.fillRect(0, Math.floor(this.game.canvas.elem.height / 2 - 20), this.game.canvas.elem.width, 40);

        // title
        ctx.font = '40px monospace';
        ctx.fillStyle = 'rgb(0,0,0)';

        let x = this.game.canvas.elem.width  / 2 - ctx.measureText(text).width / 2,
            y = this.game.canvas.elem.height / 2 + 15;

        ctx.fillText(text, x, y);

        return this;
    }

    drawMessage(message) {
        let ctx = this.game.canvas.ctx;

        ctx.font = '20px monospace';
        ctx.fillStyle = 'rgb(0,255,0)';

        ctx.fillText(
            message,
            this.game.canvas.elem.width  / 2 - ctx.measureText(message).width / 2,
            this.game.canvas.elem.height - 55
        );

        return this;
    }
}
