import Inputs  from '/js/lib/inputs.js';
import Canvas  from '/js/lib/canvas.js';
import Cannon  from '/js/lib/cannon.js';
import Invader from '/js/lib/invader.js';
import State   from '/js/lib/states/state.js';
import Menu    from '/js/lib/states/menu.js';
import Config  from '/js/app/config.js';
import Grid    from '/js/lib/grid.js';

// States:
//
//   +-------------------------+
//   |                         |
//   v                         |
// [menu]--->[playing]--->[game_over]
//   ^          | ^
//   |          | |
//   |          v |
//   +-------[paused]

export default class Game {
    // game's name
    name = "Space Invaders";

    // lasers fired by the cannon
    // (could be moved to Cannon class maybe?)
    lasers = [];

    // invaders on screen
    // (could be moved to Playing class maybe?)
    invaders = [];

    // score (duh.)
    score = 0;

    // invaders speed
    invaderSpeed = 0;

    constructor() {
        this.initialize().reset().setState(new Menu(this));
    }

    initialize() {
        // configuration is in js/app/config
        this.config = Config;

        // the canvas on which to draw
        this.canvas = new Canvas(document.getElementById('game'));
        this.canvas.setBackground(new Grid(this.canvas.elem, 25));

        // useful for debugging
        window.addEventListener('error', event => MainLoop.stop());

        // useful for debugging
        window.game = this;

        // setup the mainloop
        MainLoop.setBegin(this.begin.bind(this))
            .setUpdate(this.update.bind(this))
            .setDraw(this.draw.bind(this))
            .setEnd(this.end.bind(this))
            .start();

        return this;
    }

    reset() {
        this.lasers        = [];
        this.invaders      = [];
        this.score         = 0;
        this.invaderSpeed = this.config.invader.speed;

        this.canvas.reset();

        return this;
    }

    setState(state) {
        if (! state instanceof State) {
            throw "Not a state";
        }

        if (this.config.debug) {
            console.log("New state", state);
        }

        this.state = state;
        return this;
    }

    begin(timestamp, delta) {
        this.state.begin(timestamp, delta);
    }

    update(delta) {
        this.state.update(delta);
    }

    draw(interp) {
        this.state.draw(interp);

        if (this.config.debug) {
            this.canvas.drawCrosshair();
        }
    }

    end(fps, panic) {
        this.state.end(fps, panic);
    }

    createCannon() {
        let cfg = this.config.cannon,
            w = cfg.width,
            h = cfg.height,
            s = cfg.speed,
            c = cfg.color,
            r = cfg.reload,
            x = (Math.round(this.canvas.elem.width) / 2) - Math.round(w / 2),
            y = this.canvas.elem.height - h;

        this.cannon = new Cannon(x, y, w, h, s, c, r);
        this.canvas.add(this.cannon);

        return this;
    }

    createInvader(x, y) {
        let cfg = this.config.invader,
            w = cfg.width,
            h = cfg.height,
            v = cfg.speed,
            c = cfg.color,
            s = cfg.stride;

        x = x || Math.floor(Math.random() * (this.canvas.elem.width - cfg.stride.x));
        y = y || 0 - cfg.height - 1;

        let invader = new Invader(x, y, w, h, v, c, s);

        this.invaders.push(invader);
        this.canvas.add(invader);

        return this;
    }

    destroyInvader(invader) {
        let offset = this.invaders.indexOf(invader);

        if (offset != -1) {
            this.invaders.splice(offset, 1);
        }

        this.canvas.remove(invader);
        this.score += Math.ceil(Math.pow(this.config.invader.points, 1 + this.invaderSpeed));

        return this;
    }

    newWave() {
        let cfg = this.config.invader,
            l = cfg.lines,
            w = cfg.width,
            h = cfg.height,
            v = cfg.speed,
            c = cfg.color,
            m = Math.ceil(w / 2),
            p = (this.canvas.elem.width - cfg.stride.x) / (w + m);

        for (let i = 0; i < l; i++) {
            for (let j = 0; j < p; j++) {
                let invader = this.createInvader(
                    (w + m) * j + m / 2,
                    (h + m) * i + m / 2
                );
            }
        }

        return this;
    }

    speedUpInvaders() {
        this.invaderSpeed += this.config.invader.speedIncr;

        return this;
    }

    destroyLaser(laser) {
        let offset = this.lasers.indexOf(laser);

        if (offset != -1) {
            this.lasers.splice(offset, 1);
        }

        this.canvas.remove(laser);

        return this;
    }
}
