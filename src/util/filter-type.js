import dayjs from 'dayjs';

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

const generateFilter = (tasks) => Object.entries(filter).map(
  ([filterName, filterTasks]) => ({
    name: filterName,
    count: filterTasks(tasks).length,
  }),
);
export {generateFilter};
