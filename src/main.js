import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './framework/render';
import PointModel from './model/point-model';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const sortView = new NewSortView();
const boardPresenter = new BoardPresenter(sortContentElement, pointModel);


render(new NewFilterView(), filterElement);
render(sortView, sortContentElement);

boardPresenter.init();

export {sortView, sortContentElement};
