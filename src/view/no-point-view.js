import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../util/filter-type.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click «ADD NEW TASK» in menu to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PAST]: 'There are no past points',

};

const noPointTemlate = (filterType) =>{
  const noTaskTextValue = NoTasksTextType[filterType];
  return(
    `<p class="trip-events__msg">${noTaskTextValue}</p>`);
};
export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return noPointTemlate(this.#filterType);
  }
}
