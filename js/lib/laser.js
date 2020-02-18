import Box from './box.js';

export default class Laser extends Box {
    update(delta) {
        super.update(delta);

        this.y -= this.v * delta;
    }
}
