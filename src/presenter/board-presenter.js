import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';
import NewOfferView from '../view/point-offers-view';
import FormPhotoView from '../view/photos-view';
import {offers} from '../mock/point';


export default class BoardPresenter {
  listView = new ListView();

  init(boardContainer, pointModel) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoint = [...this.pointModel.getPoint()];
    this.formPointView = new FormPointView(this.boardPoint[0]);

    render(this.listView, this.boardContainer);
    render(this.formPointView, this.listView.getElement());
    for (let i = 0; i < this.boardPoint[0].destination.pictures.length; i++) {
      render(new FormPhotoView(this.boardPoint[0].destination.pictures[i]), this.formPointView.getElement().querySelector('.event__photos-tape'));
    }

    for (let i = 0; i < 3; i++) {
      console.log(this.boardPoint[i]);
      const pointTripView = new PointTripView(this.boardPoint[i]);
      const pointTypeOffer = offers.find((offer) => offer.type === this.boardPoint[i].type);
      render(pointTripView, this.listView.getElement());
      for (let j = 0; j < pointTypeOffer.offers.length; j++) {
        if (this.boardPoint[i].offers.includes(pointTypeOffer.offers[j].id)) {
          render (new NewOfferView(pointTypeOffer.offers[j]), pointTripView.getElement().querySelector('.event__selected-offers'));
        }
      }
    }
  }
}
