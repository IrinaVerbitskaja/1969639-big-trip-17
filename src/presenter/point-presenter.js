import {render, replace} from '../framework/render';
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
    this.#pointComponent = new PointTripView(point);
    this.#pointAddComponent = new FormPointView(point);

    this.#pointComponent.setPointFormSHandler(this.#handlePointForm);
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setFormEditHandler(this.#handleFormSubmit);

    render(this.#pointComponent, this.#pointsContainer);
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
