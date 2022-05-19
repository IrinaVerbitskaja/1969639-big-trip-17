import {render, replace, remove} from '../framework/render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';

export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointAddComponent = null;
  #point = null;

  constructor(pointsContainer) {
    this.#pointsContainer = pointsContainer;
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointAddComponent = this.#pointAddComponent;
    this.#pointComponent = new PointTripView(point);
    this.#pointAddComponent = new FormPointView(point);

    this.#pointComponent.setPointFormSHandler(this.#handlePointForm);
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setFormEditHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevPointAddComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
    }

    if (this.#pointsContainer.contains(prevPointComponent)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevPointAddComponent)) {
      replace(this.#pointAddComponent, prevPointAddComponent);
    }

    remove(prevPointComponent);
    remove(prevPointAddComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointAddComponent);
  };

  #replacePointToForm = () => {
    replace(this.#pointAddComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDown);
  };

  #replaceFormToPoint =() => {
    replace(this.#pointComponent, this.#pointAddComponent);
    document.removeEventListener('keydown', this.#escKeyDown);
  };

  #handlePointForm = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };
}
