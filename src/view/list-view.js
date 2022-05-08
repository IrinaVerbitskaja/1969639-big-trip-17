import {createElement} from '../render.js';

const listTemlate = () => '<ul class="trip-events__list"></ul>';

export default class ListView {
  #element = null;

  get template() {
    return listTemlate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
