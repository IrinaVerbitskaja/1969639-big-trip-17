import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';


export default class BoardPresenter {
  listView = new ListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;
    render(this.listView, this.boardContainer);
    render(new FormPointView(), this.listView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointTripView(), this.listView.getElement());
    }
  };
}
