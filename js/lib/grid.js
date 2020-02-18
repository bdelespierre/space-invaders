export default class Grid {
    constructor(e, s, c) {
        this.e = e;
        this.s = s;
        this.c = c;
    }

    draw(ctx, interp) {
        ctx.strokeStyle = this.c || "blue";
        ctx.beginPath();

        for (let i=0; i<this.e.width; i+=this.s) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.e.height);
        }

        for (let j=0; j<this.e.height; j+=this.s) {
            ctx.moveTo(0, j);
            ctx.lineTo(this.e.width, j);
        }

        ctx.stroke();

        return this;
    }
}
