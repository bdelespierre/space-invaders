import Point from './point.js';

export default class Box extends Point {
    constructor(x, y, w, h, v, c) {
        super(x, y);

        // width
        this.w = w;

        // height
        this.h = h;

        // veliocity
        this.v = v || 0;

        // color
        this.c = c || "black";

        // last position
        this.lastPos = { x: 0, y: 0 };
    }

    // min-----+
    // |       |
    // +-----max
    //
    get vectors() {
        return {
            min: new Point(this.x, this.y),
            max: new Point(this.x + this.w, this.y + this.h),
        };
    }

    // 0----1
    // |    |
    // 3----2
    //
    get points() {
        return [
            new Point(this.x,          this.y),
            new Point(this.x + this.w, this.y),
            new Point(this.x + this.w, this.y + this.h),
            new Point(this.x,          this.y + this.h),
        ];
    }

    update(delta) {
        this.lastPos.x = this.x;
        this.lastPos.y = this.y;
    }

    draw(ctx, interp) {
        let x = this.lastPos.x + (this.x - this.lastPos.x) * interp,
            y = this.lastPos.y + (this.y - this.lastPos.y) * interp;

        ctx.fillStyle = this.c;
        ctx.fillRect(x, y, this.w, this.h);
    }

    overlaps(box) {
        const a = this.vectors,
              b = box.vectors;

        let d1x = b.min.x - a.max.x,
            d1y = b.min.y - a.max.y,
            d2x = a.min.x - b.max.x,
            d2y = a.min.y - b.max.y;

        return ! (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0);
    }
}
