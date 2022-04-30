import {generatePoint} from '../mock/point';

export default class PointModel {
  points = Array.from({length: 3}, generatePoint);
  getPoint = () => this.points;
}
