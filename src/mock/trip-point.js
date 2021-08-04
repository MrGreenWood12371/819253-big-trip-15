import { getRandomInteger } from '../utils';
import { generateDestination } from './destination';
import { tripOffers } from './trip-offers';
import dayjs from 'dayjs';

const generateTripType = () => {
  const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  return tripTypes[getRandomInteger(0, tripTypes.length-1)];
};

export const generateTripPoint = () => {
  const tripType = generateTripType();

  return {
    'basePrice': getRandomInteger(100, 3000),
    'dateFrom': dayjs().toDate(),
    'dateTo': dayjs().add(getRandomInteger(0, 6), 'day').toDate(),
    'destination': generateDestination(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': tripOffers.filter((item) => item.type === tripType)[0].offers,
    'type': tripType,
  };
};
