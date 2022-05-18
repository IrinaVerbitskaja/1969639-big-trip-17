import {render, RenderPosition, remove} from '../framework/render';
import ListView from '../view/list-view';
import NoPointView from '../view/no-point-view';
import NewSortView from '../view/sort-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #listView = new ListView();
  #sortComponent = new NewSortView();
  #noPointComponent = new NoPointView();
  #boardPoint = [];

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.point];
    this.#renderBoard();
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    remove(this.#sortComponent);
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.#boardPoint.forEach((point) => this.#renderTripPoint(point));
  };

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listView.element);
    pointPresenter.init(point);
  };

  #renderBoard() {
    render(this.#listView, this.#boardContainer);

    if (this.#boardPoint.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}

