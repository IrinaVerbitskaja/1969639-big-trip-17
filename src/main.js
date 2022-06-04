//import NewFilterView from './view/filter-view';
import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
//import {render} from './framework/render';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
//import {generateFilter} from './util/filter-type';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(sortContentElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointModel);
//const filters = generateFilter(pointModel.point);

//render(new NewFilterView(filters, 'everything'), filterElement);

const handleNewTaskFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
};

const handleNewTaskButtonClick = () => {
  console.log('кнопка нажата');
  boardPresenter.createTask(handleNewTaskFormClose);
  document.querySelector('.trip-main__event-add-btn').disabled = true;
};


document.querySelector('.trip-main__event-add-btn').addEventListener('click', handleNewTaskButtonClick);

filterPresenter.init();
boardPresenter.init();
