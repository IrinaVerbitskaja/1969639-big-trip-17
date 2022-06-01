import Observable from '../framework/observable.js';
import {generatePoint} from '../mock/point';

export default class PointModel extends Observable {
  #points = Array.from({length: 3}, generatePoint);
  get point () {
    return this.#points;}
}
