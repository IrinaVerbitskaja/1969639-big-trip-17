import {render, replace, remove} from '../framework/render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import ListView from '../view/list-view';
import {sortView, sortContentElement} from '../main';
import NoPointView from '../view/no-point-view';

const POINT = 3;
export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #listView = new ListView();
  #boardPoint = [];

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.point];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#listView, this.#boardContainer);

    if (this.#boardPoint.every((point) => point.isArchive)) {
      remove(sortView);
      render(new NoPointView(), sortContentElement);
      return;
    }

    for (let i = 0; i < POINT; i++) {
      this.#renderTripPoint(this.#boardPoint[i]);
    }
  }

  #renderTripPoint = (point) => {
    const pointComponent = new PointTripView(point);
    const pointAddComponent = new FormPointView(point);

    const replacePointToForm = () => {
      replace(pointAddComponent, pointComponent);
    };

    const replaceFormToPoint =() => {
      replace(pointComponent, pointAddComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setPointFormSHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointAddComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointAddComponent.setFormEditHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listView.element);
  };
}

