import Inputs   from '/js/lib/inputs.js';
import State    from './state.js';
import Paused   from './paused.js';
import Panic    from './panic.js';
import GameOver from './game_over.js';

export default class Playing extends State {
    constructor(game) {
        super(game);

        this.game.reset();
        this.game.createCannon();
    }

    pause() {
        return this.game.setState(new Paused(this.game));
    }

    gameOver() {
        return this.game.setState(new GameOver(this.game));
    }

    panic() {
        return this.game.setState(new Panic(this.game));
    }

    begin(timestamp, delta) {
        let cannon = this.game.cannon;

        if (! document.hasFocus()) {
            return this.pause();
        }

        if (Inputs.space && cannon.canFire(delta)) {
            let laser = cannon.fire(delta);
            laser.c = this.game.config.laser.color;
            this.game.lasers.push(laser);
            this.game.canvas.add(laser);
        }

        if (Inputs.arrowLeft) {
            cannon.x = Math.max(0, cannon.x - Math.abs(cannon.v) * delta);
        }

        if (Inputs.arrowRight) {
            cannon.x = Math.min(this.game.canvas.elem.width - cannon.w, cannon.x + Math.abs(cannon.v) * delta);
        }

        if (Inputs.p || Inputs.escape) {
            this.pause();
        }
    }

    update(delta) {
        this.game.canvas.update(delta);
    }

    draw(interp) {
        this.game.canvas.clear().draw(interp);
    }

    end(fps, panic) {
        if (panic) {
            return this.panic();
        }

        this.game.lasers.forEach(laser => {
            this.game.invaders.forEach(invader => {
                if (laser.overlaps(invader)) {
                    this.game.destroyInvader(invader);
                    this.game.destroyLaser(laser);
                }

                if (laser.y < 0 - this.game.canvas.elem.height) {
                    this.game.canvas.remove(laser);
                }
            });
        });

        if (! this.game.invaders.length) {
            this.game.speedUpInvaders();
            this.game.newWave();
        }

        if (this.game.invaders.some(invader => this.game.cannon.overlaps(invader))) {
            return this.gameOver();
        }

        if (this.game.invaders.some(invader => invader.y >= this.game.canvas.elem.height)) {
            return this.gameOver();
        }
    }
}
