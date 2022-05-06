import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './render';
import PointModel from './model/point-model';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();
const pointModel = new PointModel();


render(new NewFilterView(), filterElement);
render(new NewSortView(), sortContentElement);

boardPresenter.init(sortContentElement, pointModel);

