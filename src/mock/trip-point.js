import { getRandomInteger } from '../utils/common';
import { generateDestination } from './destination';
import { generateTripOffer } from './trip-offers';
import dayjs from 'dayjs';

const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const generateTripType = () => tripTypes[getRandomInteger(0, tripTypes.length-1)];

export const generateTripPoint = () => {
  const tripType = generateTripType();

  return {
    'basePrice': getRandomInteger(100, 3000),
    'dateFrom': dayjs().toDate(),
    'dateTo': dayjs().add(getRandomInteger(0, 6), 'day').toDate(),
    'destination': generateDestination(),
    'isFavorite': !!getRandomInteger(0, 1),
    'offers': generateTripOffer().filter((item) => item.type === tripType)[0].offers,
    'type': tripType,
  };
};
