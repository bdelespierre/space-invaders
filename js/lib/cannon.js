import Box   from './box.js';
import Laser from './laser.js';

export default class Cannon extends Box {
    // time elapsed since last fire
    elapsed=0;

    // reload time between fires
    reload=250;

    constructor(x, y, w, h, v, c, r) {
        super(x, y, w, h, v, c);

        this.reload = r;
    }

    canFire(delta) {
        this.elapsed += delta;
        return this.elapsed >= this.reload;
    }

    fire(delta) {
        this.elapsed = 0;
        return new Laser(this.x + Math.round(this.w / 2), this.y, 1, 5, 0.4)
    }
}
