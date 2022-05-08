import {generatePoint} from '../mock/point';

export default class PointModel {
  #points = Array.from({length: 3}, generatePoint);
  get point () {
    return this.#points;}
}
