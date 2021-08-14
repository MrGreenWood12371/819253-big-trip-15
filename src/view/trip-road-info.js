import dayjs from 'dayjs';
import AbstractView from './abstract';

const generateTripDestinationTemplate = (el) => el.length <= 3 ? el.join(' &mdash; ') : `${el[0]} &mdash; ... &mdash; ${el[el.length-1]}`;


const createTripRoadInfoTemplate = (tripPoints) => {
  const {dateFrom} = tripPoints[0];
  const {dateTo} = tripPoints[tripPoints.length-1];
  const tripDestinations = [];
  tripPoints.forEach((element) => {
    tripDestinations.push(element.destination.name);
  });

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${generateTripDestinationTemplate(tripDestinations)}</h1>

    <p class="trip-info__dates">${dayjs(dateFrom).format('D MMM')} &mdash; ${dayjs(dateTo).format('D MMM')}</p>
  </div>
</section>`;
};

export default class TripRoadInfo extends AbstractView {
  constructor (tripPoints) {
    super();
    this._tripPoints = tripPoints;
  }

  getTemplate() {
    return createTripRoadInfoTemplate(this._tripPoints);
  }
}
