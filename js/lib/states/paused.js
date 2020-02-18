import Inputs  from '/js/lib/inputs.js';
import State   from './state.js';
import Playing from './playing.js';

export default class Paused extends State {
    constructor(game) {
        super(game);

        this.previous = game.state;
    }

    resume() {
        return this.game.setState(this.previous);
    }

    begin(timestamp, delta) {
        if (Inputs.space) {
            this.resume();
        }

        this.blinking = Math.round(timestamp / 600) % 2 == 0;
    }

    draw(interp) {
        this.game.canvas.clear().draw(interp);

        this.drawTitle('Paused')

        if (this.blinking) {
            this.drawMessage('press SPACE to continue');
        }
    }
}
