import {createElement} from '../render';

const createOfferTemlate = () => (
  `<li class="event__offer">
      <span class="event__offer-title">Add luggage</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">50</span>
    </li>`
);


export default class NewOfferView {
  getTemplate() {
    return createOfferTemlate();
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
