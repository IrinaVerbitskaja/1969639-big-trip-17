import {createElement} from '../render.js';


const createPhotoTemlate = (point) => {
  const {src, description} = point;

  return (
    `<img class="event__photo" src=${src} alt=${description}>`
  );};

export default class FormPhotoView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPhotoTemlate(this.point);
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
