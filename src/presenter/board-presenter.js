import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';

const POINT = 3;
export default class BoardPresenter {
  listView = new ListView();

  init(boardContainer, pointModel) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoint = [...this.pointModel.getPoint()];
    this.formPointView = new FormPointView(this.boardPoint[0]);

    render(this.listView, this.boardContainer);
    render(this.formPointView, this.listView.getElement());

    for (let i = 0; i < POINT; i++) {
      const pointTripView = new PointTripView(this.boardPoint[i]);
      render(pointTripView, this.listView.getElement());
    }
  }
}

