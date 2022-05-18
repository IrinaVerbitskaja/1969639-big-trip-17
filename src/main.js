import NewFilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import {render} from './framework/render';
import PointModel from './model/point-model';
import {generateFilter} from './util/filter-type';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter(sortContentElement, pointModel);

const filters = generateFilter(pointModel.point);

render(new NewFilterView(filters), filterElement);

boardPresenter.init();
