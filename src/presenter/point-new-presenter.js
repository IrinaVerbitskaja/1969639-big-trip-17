import {remove, render, RenderPosition} from '../framework/render.js';
import NewFormPointView from '../view/add-new-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../util/filter-type.js';
//import {destination, generateOfferType} from '../mock/point.js';
//import {getRandomInteger} from '../util/random';

/*const newPoint =  {
  basePrice: getRandomInteger(0, 300),
  dateFrom: `2019-07-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T11:22:13.375Z`,
  destination: destination,
  id: nanoid(),
  isFavorite: false,
  offers: [1, 2],
  type:generateOfferType(),
};*/

export default class PointNewPresenter {
  #taskListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;

  constructor(taskListContainer, changeData) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
  }

  init = (callback, newPoint) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new NewFormPointView(newPoint);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    //this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setFormEditHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#taskListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    console.log('обработчик delit');
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
