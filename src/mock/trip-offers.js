import { getRandomInteger } from '../utils';

const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const tripOffers = [];

export const generateTripOffer = () => {
  const offersTemplates = [];
  const offersCount = getRandomInteger(0, 5);

  for (let i = 0; i < offersCount; i++) {
    const offer = {
      'title': 'Add offer',
      'price': getRandomInteger(10, 300),
    };
    offersTemplates.push(offer);
  }

  tripTypes.forEach((el) => {
    tripOffers.push({
      'type': el,
      'offers': offersTemplates,
    });
  });

  return tripOffers;
};
