import {render, replace, remove} from '../framework/render';
import FormPointView from '../view/add-point-view';
import PointTripView from '../view/point-trip-view';
import {UserAction, UpdateType} from '../util/filter-type';
import {isDatesEqual} from '../util/humanday';

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
    this.#pointAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

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
      this.#pointAddComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointAddComponent);
  }

  #handleFavoriteClick = () => {
    //this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #replacePointToForm = () => {
    replace(this.#pointAddComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointAddComponent);
    document.removeEventListener('keydown', this.#escKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #handlePointForm = () => {
    this.#replacePointToForm();
  };

  #handleFormEdit = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (update) => {
    //this.#changeData(point);
    const isMinorUpdate =
    !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
  };

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointAddComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
