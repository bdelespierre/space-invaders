import Box from './box.js';
import Path from './path.js';
import Point from './point.js';

export default class Invader extends Box {
    constructor(x, y, w, h, v, c, stride) {
        super(x, y, w, h, v, c);

        this.stride = stride;
        this.orig = { x: x, y: y };
    }

    update(delta) {
        super.update(delta);

        if (! this.animation) {
            this.animation = this.path().animate(this);
        }

        this.animation.walk(this.v * delta);
    }

    path() {
        let points = [],
            x = this.orig.x,
            y = this.orig.y;

        // 0
        // |
        // 1--2
        //    |
        // 4--3

        points.push(new Point(x, y));
        while (y < this.canvas.elem.height) {
            y += this.stride.y;
            points.push(new Point(x, y));
            x += this.stride.x;
            points.push(new Point(x, y));
            y += this.stride.y;
            points.push(new Point(x, y));
            x -= this.stride.x
            points.push(new Point(x, y));
        }

        return new Path(points)
    }
}
