import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';
import NewOfferView from '../view/point-offers-view';
import {offers} from '../mock/point';


export default class BoardPresenter {
  listView = new ListView();

  init(boardContainer, pointModel) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoint = [...this.pointModel.getPoint()];

    render(this.listView, this.boardContainer);
    render(new FormPointView(this.boardPoint[0]), this.listView.getElement());

    for (let i = 0; i < 3; i++) {
      console.log(this.boardPoint[i]);
      const pointTripView = new PointTripView(this.boardPoint[i]);
      render(pointTripView, this.listView.getElement());
      for (let j = 0; j < offers.length; j++) {
        if (offers[j].id === this.boardPoint[i].id) {
          render (new NewOfferView(offers[j]), pointTripView.getElement().querySelector('.event__selected-offers'));
        }
      }
    }
  }
}
