import {render, replace, remove} from '../framework/render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointAddComponent = null;
  #changeData = null;
  #changeMode = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointAddComponent = this.#pointAddComponent;
    this.#pointComponent = new PointTripView(point);
    this.#pointAddComponent = new FormPointView(point);

    this.#pointComponent.setPointFormSHandler(this.#handlePointForm);
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setFormEditHandler(this.#handleFormEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointComponent === null || prevPointAddComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointAddComponent, prevPointAddComponent);
    }

    remove(prevPointComponent);
    remove(prevPointAddComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointAddComponent);
  }

  #handleFavoriteClick() {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #replacePointToForm() {
    replace(this.#pointAddComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointAddComponent);
    document.removeEventListener('keydown', this.#escKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handlePointForm() {
    this.#replacePointToForm();
  }

  #handleFormEdit() {
    this.#replaceFormToPoint();
  }

  #handleFormSubmit(point) {
    this.#changeData(point);
    this.#replaceFormToPoint();
  }

  #escKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  }
}
