import { generateTripPoint } from '../mock/trip-point';
import AbstractDataService from './abstract-data-service';

const POINTS_COUNT = 20;

export default class Mock extends AbstractDataService {
  constructor() {
    super();
  }

  getTripPoints() {
    this._tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);
    return this._tripPoints;
  }

  getOffers() {
    const offers = [];
    this._tripPoints.forEach((el) => {
      if(!(offers.find((item) => item.type === el.type))) {
        offers.push({
          type: el.type,
          offers: el.offers,
        });
      }
    });
    return offers;
  }
}
