import dayjs from 'dayjs';

const humanizeData = (pointData) => dayjs(pointData).format('MMM D');
const humanizeClassData = (pointData) => dayjs(pointData).format('YYYY-MM-DDTHH:mm');
const humanizeTime = (pointData) => dayjs(pointData).format('HH:mm');
const humanizeDataFromClass = (pointData) => dayjs(pointData).format('YYYY-MM-DD');
const humanizeDifference = (date1, date2) => dayjs(date2).diff(dayjs(date1), 'second');//dayjs.duration(dayjs(date1).diff(dayjs(date2)));
const humanizeDateAddPoint = (pointData) => dayjs(pointData).format('DD/MM/YY HH:mm');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointPriceDown = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointTimeDown = (pointA, pointB) => humanizeDifference(pointB.dateFrom, pointB.dateTo) - humanizeDifference(pointA.dateFrom, pointA.dateTo);

export {humanizeData, humanizeClassData, humanizeTime, humanizeDataFromClass, humanizeDifference, humanizeDateAddPoint, sortPointUp, sortPointPriceDown, sortPointTimeDown};
