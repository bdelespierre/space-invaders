import Animation from './animation.js';

export default class Path {
    constructor(points, color) {
        this.points = points || [];
        this.color  = color  || 'rgb(0,0,0)';
    }

    draw(ctx, interp) {
        if (this.points.length < 2) {
            return;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        this.points.forEach(point => ctx.lineTo(point.x, point.y));

        ctx.stroke();
    }

    animate(object) {
        return new Animation(object, this.points);
    }
}
