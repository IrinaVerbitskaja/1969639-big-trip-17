import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDateAddPoint} from '../util/humanday.js';
import {offers} from '../mock/point.js';

const createFormPointTemlate = (point) => {
  const {basePrice, destination, type, dateFrom, dateTo, isBasePrice, isDateFrom, isDateTo} = point;

  const price = isBasePrice ? basePrice : '';
  const dateFromHum = isDateFrom ? humanizeDateAddPoint(dateFrom) : '';
  const dateToHum = isDateTo ? humanizeDateAddPoint(dateTo) : '';

  const pictures = destination.pictures.map((photo) => `<img class="event__photo" src=${photo.src} alt=${photo.description}>`).join('');

  const pointTypeOffer = offers.find((offer) => offer.type === type);
  let pointAddOffer = [];
  if (pointTypeOffer) {
    pointAddOffer = pointTypeOffer.offers.map((typeOffer) => {
      const checked = point.offers.includes(typeOffer.id) ? 'checked' : '';
      return     `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" ${checked}>
       <label class="event__offer-label" for="event-offer-comfort-1">
         <span class="event__offer-title">${typeOffer.title}</span>
          &plus;&euro;&nbsp;
         <span class="event__offer-price">${typeOffer.price}</span>
     </label>
   </div>`;}).join('');}

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
       <div class="event__type-wrapper">
       <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromHum}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToHum}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${pointAddOffer}
    </div>
  </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
         ${pictures}
        </div>
      </div>
     </section>
    </section>
   </form>
  </li>`
  );};

export default class FormPointView extends AbstractStatefulView{

  constructor(point) {
    super();
    this._state = FormPointView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormPointTemlate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormPointView.parseStateToPoint(this._state));
  };

  setFormEditHandler = (callback) => {
    this._callback.formEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditHandler);
  };

  #formEditHandler = (evt) => {
    evt.preventDefault();
    this._callback.formEdit();
  };

  #iconChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #startTimeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      dateFrom: evt.target.value,
    });
  };

  #endTimeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      dateTo: evt.target.value,
    });
  };

  #townNameHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      name: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#iconChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditHandler);
    this.element.querySelector('[name="event-start-time"]').addEventListener('input', this.#startTimeHandler);
    this.element.querySelector('[name="event-end-time"]').addEventListener('input', this.#endTimeHandler);
    this.element.querySelector('[id="destination-list-1"]').addEventListener('change', this.#townNameHandler);
  };

  reset = (point) => {
    this.updateElement(
      FormPointView.parsePointToState(point),
    );
  };

  static parsePointToState = (point) => ({...point,
    isBasePrice: point.basePrice !== null,
    isDateFrom: point.dateFrom !== null,
    isDateTo: point.dateTo !== null,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    if (!point.isBasePrice) {
      point.basePrice = null;
    }

    if (!point.isDateFrom) {
      point.dateFrom = null;
    }

    if (!point.isDateTo) {
      point.dateTo = null;
    }

    delete point.isBasePrice;
    delete point.isDateFrom;
    delete point.isDateTo;

    return point;
  };
}
