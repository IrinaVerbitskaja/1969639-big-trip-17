import {createElement} from '../render.js';

const listTemlate = () => '<ul class="trip-events__list"></ul>';

export default class ListView {
  getTemplate() {
    return listTemlate();
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
