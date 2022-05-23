import {render, RenderPosition, remove} from '../framework/render';
import ListView from '../view/list-view';
import NoPointView from '../view/no-point-view';
import NewSortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../util/random';
import {SortType} from '../util/filter-type';
import {sortPointPriceDown, sortPointTimeDown, sortPointUp} from '../util/humanday';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #listView = new ListView();
  #sortComponent = new NewSortView();
  #noPointComponent = new NoPointView();
  #boardPoint = [];
  #pointPresenter = new Map();

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.point];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) =>{
    this.#boardPoint = updateItem(this.#boardPoint, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoint = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#boardPoint.sort(sortPointTimeDown);
        break;
      case SortType.PRICE:
        this.#boardPoint.sort(sortPointPriceDown);
        break;
      case SortType.DAY:
        this.#boardPoint.sort(sortPointUp);
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoints = () => {
    remove(this.#sortComponent);
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.#boardPoint.forEach((point) => this.#renderTripPoint(point));
  };

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listView.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderBoard = () => {
    render(this.#listView, this.#boardContainer);

    if (this.#boardPoint.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#boardPoint.sort(sortPointUp);
    his.#renderPoints();
  };
}

