import {getRandomInteger} from '../util/random';
import {nanoid} from 'nanoid';

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const cities = ['Berlin', 'Hamburg', 'Munich'];

const generateOfferType = () => {
  const offersPointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const randomIndex = getRandomInteger(0, offersPointType.length-1);
  return offersPointType[randomIndex];
};

const destination = {
  description: generateDescription(),
  name: 'Berlin',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10)}`,
      description: generateDescription()
    }
  ]
};

const offers = [
  {
    type: generateOfferType(),
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 125
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 65
      } ]
  },
  {
    type: generateOfferType(),
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      } ]
  },
];


const generatePoint = () => ({
  basePrice: getRandomInteger(0, 300),
  dateFrom: `2022-0${getRandomInteger(1, 9)}-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
  dateTo: `2022-0${getRandomInteger(1, 9)}-${getRandomInteger(10, 30)}T11:22:13.375Z`,
  destination: destination,
  id: nanoid(),
  isFavorite: false,
  offers: [1, 2],
  type:generateOfferType(),
});

export {generatePoint, offers, destination, generateOfferType, cities};

