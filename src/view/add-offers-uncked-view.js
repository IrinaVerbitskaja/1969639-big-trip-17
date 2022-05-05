import {createElement} from '../render.js';

const createOffersUncheckedTemlate = (offer) => {
  const {title, price} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort">
        <label class="event__offer-label" for="event-offer-comfort-1">
          <span class="event__offer-title">${title}</span>
           &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );};

export default class FormOffersUncheckedView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemplate() {
    return createOffersUncheckedTemlate(this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
