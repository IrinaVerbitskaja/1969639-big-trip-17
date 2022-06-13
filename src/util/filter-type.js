import dayjs from 'dayjs';

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const filterEvery = (date1, date2, task) => dayjs(date1).isBefore(dayjs()) && dayjs(date2).isAfter(dayjs()) && !task.isArchive;
const filterSameFuture = (date1) => dayjs(date1).isAfter(dayjs()) || dayjs(date1).isSame(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks.filter((task) => !task.isArchive),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => (filterSameFuture(task.dateFrom) && !task.isArchive) || filterEvery(task.dateFrom, task.dateTo, task)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => (dayjs(task.dateTo).isBefore(dayjs()) && !task.isArchive) || filterEvery(task.dateFrom, task.dateTo, task)),
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {filter, FilterType, SortType, UserAction, UpdateType};
