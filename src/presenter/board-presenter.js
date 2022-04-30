import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';


export default class BoardPresenter {
  listView = new ListView();

  init(boardContainer, pointModel) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoint = [...this.pointModel.getPoint()];

    render(this.listView, this.boardContainer);
    render(new FormPointView(), this.listView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointTripView(this.boardPoint[i]), this.listView.getElement());
    }
  }
}
