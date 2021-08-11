import { createElement } from '../utils';

const createTripPriceTemplate = (tripPoints) => {
  let tripCost = 0;

  tripPoints.forEach((element) => {
    tripCost += element.basePrice;
  });

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
</p>`;
};

export default class TripPrice {
  constructor (tripPoints) {
    this._tripPoints = tripPoints;
    this._element = null;
  }

  getTemplate() {
    return createTripPriceTemplate(this._tripPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
