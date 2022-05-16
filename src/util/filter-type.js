import dayjs from 'dayjs';

const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const filter = {
  [filterType.EVERYTHING]: (tasks) => tasks.filter((task) => !task.isArchive),
  [filterType.FUTURE]: (tasks) => tasks.filter((task) => ((dayjs(task.dateFrom).isAfter(dayjs()) || dayjs(task.dateFrom).isSame(dayjs())) && !task.isArchive) || (dayjs(task.dateFrom).isBefore(dayjs()) && dayjs(task.dateTo).isAfter(dayjs())  && !task.isArchive)),
  [filterType.PAST]: (tasks) => tasks.filter((task) => (dayjs(task.dateTo).isBefore(dayjs()) && !task.isArchive) || (dayjs(task.dateFrom).isBefore(dayjs()) && dayjs(task.dateTo).isAfter(dayjs()) && !task.isArchive)),
};

const generateFilter = (tasks) => Object.entries(filter).map(
  ([filterName, filterTasks]) => ({
    name: filterName,
    count: filterTasks(tasks).length,
  }),
);
export {generateFilter};
