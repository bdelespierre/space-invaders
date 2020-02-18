import Inputs from '/js/lib/inputs.js';
import State  from './state.js';
import Menu   from './menu.js';

export default class GameOver extends State {
    menu() {
        return this.game.reset().setState(new Menu(this.game));
    }

    begin(timestamp, delta) {
        if (Inputs.escape) {
            this.menu();
        }
    }

    draw(interp) {
        this.game.canvas.reset().clear().draw(interp);

        this.drawTitle('Game Over').drawMessage('Score: ' + this.game.score);
    }
}
