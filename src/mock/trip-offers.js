import { getRandomInteger } from '../utils';

const tripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const generateTripOffer = () => {
  const offersTemplates = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const offer = {
      'title': 'Add offer',
      'price': getRandomInteger(10, 300),
    };
    offersTemplates.push(offer);
  }
  return offersTemplates;
};

const tripOffers = [];

tripTypes.forEach((el) => {
  tripOffers.push({
    'type': el,
    'offers': generateTripOffer(),
  });
});

export {tripOffers};
