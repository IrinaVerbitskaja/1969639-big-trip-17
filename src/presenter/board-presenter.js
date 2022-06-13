import {render, RenderPosition, remove} from '../framework/render';
import ListView from '../view/list-view';
import NoPointView from '../view/no-point-view';
import NewSortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';
import {filter} from '../util/filter-type';
import {SortType, UpdateType, UserAction, FilterType} from '../util/filter-type';
import {sortPointPriceDown, sortPointTimeDown, sortPointUp} from '../util/humanday';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #listView = new ListView();
  #noPointComponent = null;
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #pointPresenter = new Map();
  #sortComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor(boardContainer, pointModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#listView.element, this.#handleViewAction);
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get point() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.point;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceDown);
      case SortType.DAY:
        return filteredPoints.sort(sortPointUp);
    }

    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createTask = (callback, newPoint) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, newPoint);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new NewSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    remove(this.#sortComponent);
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.point.forEach((point) => this.#renderTripPoint(point));
  };

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listView.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    const points = this.point;
    const pointCount = points.length;
    render(this.#listView, this.#boardContainer);

    if (pointCount === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  };
}

