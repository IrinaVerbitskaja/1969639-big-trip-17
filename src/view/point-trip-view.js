import AbstractView from '../framework/view/abstract-view';
import {offers} from '../mock/point';
import {humanizeData, humanizeClassData, humanizeTime, humanizeDataFromClass, humanizeDifference} from '../util/humanday.js';

const DIFF_SECOND = 60;
const DIFF_HOUR = 3600;
const DIFF_DAY = 24;

const createPointTripTemlate = (point) => {
  const {basePrice, dateFrom, dateTo, type, destination} = point;
  const humanDataFrom = humanizeData(dateFrom);
  const humanDataClassFrom = humanizeClassData(dateFrom);
  const humanDataFromClass = humanizeDataFromClass(dateFrom);
  const humanTimeFrom = humanizeTime(dateFrom);
  const humanDataClassTo = humanizeClassData(dateTo);
  const humanTimeTo = humanizeTime(dateTo);
  const differenceDate = humanizeDifference(dateFrom, dateTo);

  const diffHour = () => {
    const hour = Math.round(differenceDate/DIFF_HOUR);
    if ( hour > 0 && hour < DIFF_DAY) {
      const second = differenceDate - (hour * DIFF_HOUR);
      const minute = Math.ceil(second / DIFF_SECOND);
      return `${hour}H ${minute}M`;
    } else if (hour >= DIFF_DAY) {
      const day = Math.floor(hour / DIFF_DAY);
      const hourDay = hour - (day * DIFF_DAY);
      const second = differenceDate - (hour * DIFF_HOUR);
      const minute = Math.ceil(second / DIFF_SECOND);
      return `${day}D ${hourDay}H ${minute}M`;
    } else {
      const minute = Math.ceil(differenceDate / DIFF_SECOND);
      return `${minute}M`;}
  };

  const pointTypeOffer = offers.find((offer) => offer.type === type);
  let pointOffer = [];
  if (pointTypeOffer) {
    pointOffer = pointTypeOffer.offers.map((typeOffer) =>
      point.offers.includes(typeOffer.id) ?
        `<li class="event__offer">
            <span class="event__offer-title">${typeOffer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${typeOffer.price}</span>
         </li>`: '').join('');}

  return (
    `<li class="trip-events__item">
    <div class="event">
    <time class="event__date" datetime="${humanDataFromClass}">${humanDataFrom}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
           <time class="event__start-time" datetime="${humanDataClassFrom}">${humanTimeFrom}</time>
            &mdash;
           <time class="event__end-time" datetime="${humanDataClassTo}">${humanTimeTo}</time>
          </p>
          <p class="event__duration">${diffHour()}</p>
        </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${pointOffer}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );};
export default class PointTripView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTripTemlate(this.#point);
  }

  setPointFormSHandler = (callback) => {
    this._callback.pointForm = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointFormHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #pointFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointForm();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
