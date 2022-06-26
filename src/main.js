import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
//import {generateOfferType} from './mock/point';
import {nanoid} from 'nanoid';
import {getRandomInteger} from './util/random';
// {destination} from './mock/point';
import PointsApiService from './tasks-api-service';
import DestinationApiService from './destination-api';

const AUTHORIZATION = 'Basic jfekjoortwjgioi4';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripMain = document.querySelector('.trip-main');
const filterElement = tripMain.querySelector('.trip-controls__filters');
const sortContentElement = document.querySelector('.trip-events');
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const destinationServer = new DestinationApiService(END_POINT, AUTHORIZATION);
const destinationApi = destinationServer.destination;
console.log(destinationApi);

const newPoint =  {
  basePrice: null,
  dateFrom: `2019-07-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
  dateTo: `2019-07-${getRandomInteger(10, 30)}T11:22:13.375Z`,
  destination: [],
  id: nanoid(),
  isFavorite: false,
  offers: [1, 2],
  type:'taxi',
};

const boardPresenter = new BoardPresenter(sortContentElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointModel);

const handleNewTaskFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
};

const handleNewTaskButtonClick = () => {
  boardPresenter.createTask(handleNewTaskFormClose, newPoint);
  document.querySelector('.trip-main__event-add-btn').disabled = true;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', handleNewTaskButtonClick);

filterPresenter.init();
boardPresenter.init();
pointModel.init();

export {destinationApi};
