import Point from './point.js';

export default class Animation {
    constructor(object, points) {
        this.object = object;

        // we need to clone the points otherwise the points in the path
        // are destroyed as the animation progresses
        this.points = points.map(point => new Point(point.x, point.y));
    }

    walk(length) {
        if (! this.points.length) {
            return true;
        }

        let point = this.points[0],
            dist = Point.distance(point, this.object);

        if (length >= dist) {
            this.object.x = point.x;
            this.object.y = point.y;
            this.points.shift();

            return this.walk(length - dist);
        }

        if (length < dist) {
            // formula: https://math.stackexchange.com/a/1630886
            let t = length / dist;
            this.object.x = (1 - t) * this.object.x + t * point.x;
            this.object.y = (1 - t) * this.object.y + t * point.y;

            return false;
        }
    }
}
