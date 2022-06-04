import {render, RenderPosition, remove} from '../framework/render';
import ListView from '../view/list-view';
import NoPointView from '../view/no-point-view';
import NewSortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {filter} from '../util/filter-type';
//import {updateItem} from '../util/random';
import {SortType, UpdateType, UserAction} from '../util/filter-type';
import {sortPointPriceDown, sortPointTimeDown, sortPointUp} from '../util/humanday';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #listView = new ListView();
  //#sortComponent = new NewSortView();
  #noPointComponent = new NoPointView();
  #currentSortType = SortType.DAY;
  //#boardPoint = [];
  #pointPresenter = new Map();
  #sortComponent = null;
  #filterModel = null;

  constructor(boardContainer, pointModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get point() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.point;
    const filteredPoints = filter[filterType](points);

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
    //this.#boardPoint = [...this.#pointModel.point];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  /*#handlePointChange = (updatedPoint) =>{
    //this.#boardPoint = updateItem(this.#boardPoint, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };*/

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  /*#sortPoint = (sortType) => {
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
  };*/

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    /*this.#clearPointList();
    this.#renderPoints();*/
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    //render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent = new NewSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    remove(this.#sortComponent);
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    //this.#boardPoint.forEach((point) => this.#renderTripPoint(point));
    this.point.forEach((point) => this.#renderTripPoint(point));
  };

  #renderTripPoint = (point) => {
    //const pointPresenter = new PointPresenter(this.#listView.element, this.#handlePointChange, this.#handleModeChange);
    const pointPresenter = new PointPresenter(this.#listView.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  /*#clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };*/

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    const points = this.point;
    const pointCount = points.length;
    render(this.#listView, this.#boardContainer);

    //if (this.#boardPoint.every((point) => point.isArchive))
    //if (this.point.every((point) => point.isArchive))
    if (pointCount === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    //this.#boardPoint.sort(sortPointUp);
    //this.#renderPoints();
    //render(this.#listView.element, this.#boardContainer.element);

    this.#renderPoints();
  };
}

