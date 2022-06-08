//import NewFilterView from './view/filter-view';
import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
//import NewFormPointView from './view/add-new-point-view';
//import {render, RenderPosition, remove} from './framework/render';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
//import {generateFilter} from './util/filter-type';
import {generateOfferType} from './mock/point';
import {nanoid} from 'nanoid';
import {getRandomInteger} from './util/random';
import {destination} from './mock/point';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const newPoint =  {
  basePrice: null,
  dateFrom: `2019-07-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T11:22:13.375Z`,
  destination: destination,
  id: nanoid(),
  isFavorite: false,
  offers: [1, 2],
  type:generateOfferType(),
};


const boardPresenter = new BoardPresenter(sortContentElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointModel);
//const filters = generateFilter(pointModel.point);

//render(new NewFilterView(filters, 'everything'), filterElement);

const handleNewTaskFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  //render(new NewFormPointView(newPoint), sortContentElement, RenderPosition.AFTERBEGIN);
};

const handleNewTaskButtonClick = () => {
  console.log('кнопка нажата');
  boardPresenter.createTask(handleNewTaskFormClose, newPoint);
  document.querySelector('.trip-main__event-add-btn').disabled = true;
};


document.querySelector('.trip-main__event-add-btn').addEventListener('click', handleNewTaskButtonClick);

filterPresenter.init();
boardPresenter.init();


