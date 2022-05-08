import {render} from '../render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';

const POINT = 3;
export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #pointTripView = null;

  #listView = new ListView();
  #boardPoint = [];

  init(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#boardPoint = [...this.#pointModel.point];

    render(this.#listView, this.#boardContainer);

    for (let i = 0; i < POINT; i++) {
      this.#renderTripPoint(this.#boardPoint[i]);
    }
  }

  #renderTripPoint = (point) => {
    const pointComponent = new PointTripView(point);
    const pointAddComponent = new FormPointView(point);

    const replacePointToForm = () => {
      this.#listView.element.replaceChild(pointAddComponent.element, pointComponent.element);
    };

    const replaceFormToPoint =() => {
      this.#listView.element.replaceChild(pointComponent.element, pointAddComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointAddComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointAddComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listView.element);
  };
}

