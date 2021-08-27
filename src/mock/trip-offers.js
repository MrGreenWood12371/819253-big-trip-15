import { getRandomInteger } from '../utils/common';

const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const tripOffers = [];

const tripOffersList = [
  {name: 'luggage', title: 'Add luggage', price: getRandomInteger(10, 300)},
  {name: 'comfort', title: 'Switch to comfort', price: getRandomInteger(10, 300)},
  {name: 'meal', title: 'Add meal', price: getRandomInteger(10, 300)},
  {name: 'seats', title: 'Choose seats', price: getRandomInteger(10, 300)},
];

const generateOffersTemplate = () => {
  const offersTemplates = [];
  const offersCount = getRandomInteger(0, 5);

  for (let i = 0; i < offersCount; i++) {
    offersTemplates.push(tripOffersList[getRandomInteger(0, tripOffersList.length-1)]);
  }
  return offersTemplates;
};

export const generateTripOffer = () => {
  tripTypes.forEach((el) => {
    tripOffers.push({
      'type': el,
      'offers': generateOffersTemplate(),
    });
  });
  return tripOffers;
};
