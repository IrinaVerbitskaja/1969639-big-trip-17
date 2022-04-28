import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './render';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();


render(new NewFilterView(), filterElement);
render(new NewSortView(), sortContentElement);

boardPresenter.init(sortContentElement);

