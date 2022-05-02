import {createElement} from '../render';

const createOfferTemlate = (offer) => {
  const {title, price} = offer;
  return(
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  );};


export default class NewOfferView {
  constructor (offer){
    this.offer = offer;
  }

  getTemplate() {
    return createOfferTemlate(this.offer);
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
