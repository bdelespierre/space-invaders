import Inputs  from '/js/lib/inputs.js';
import State   from './state.js';
import Playing from './playing.js';

export default class Menu extends State {
    play() {
        return this.game.setState(new Playing(this.game));
    }

    begin(timestamp, delta) {
        if (Inputs.space) {
            Inputs.space = false;
            this.play();
        }

        this.blinking = Math.round(timestamp / 600) % 2 == 0;
    }

    draw(interp) {
        this.game.canvas.clear().draw(interp);

        this.drawTitle(this.game.name);

        if (this.blinking) {
            this.drawMessage("press SPACE to start");
        }
    }
}
