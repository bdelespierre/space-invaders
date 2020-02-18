import State from './state.js';

export default class Panic extends State {
    begin(timestamp, delta) {
        throw "Panic!";
    }
}
