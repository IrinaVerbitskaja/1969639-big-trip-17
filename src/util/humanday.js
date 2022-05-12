import dayjs from 'dayjs';

const humanizeData = (pointData) => dayjs(pointData).format('MMM D');
const humanizeClassData = (pointData) => dayjs(pointData).format('YYYY-MM-DDTHH:mm');
const humanizeTime = (pointData) => dayjs(pointData).format('HH:mm');
const humanizeDataFromClass = (pointData) => dayjs(pointData).format('YYYY-MM-DD');
const humanizeDifference = (date1, date2) => dayjs(date2).diff(dayjs(date1), 'second');//dayjs.duration(dayjs(date1).diff(dayjs(date2)));
const humanizeDateAddPoint = (pointData) => dayjs(pointData).format('DD/MM/YY HH:mm');

export {humanizeData, humanizeClassData, humanizeTime, humanizeDataFromClass, humanizeDifference, humanizeDateAddPoint};
