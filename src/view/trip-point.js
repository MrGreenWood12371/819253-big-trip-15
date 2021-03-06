import dayjs from 'dayjs';
import AbstractView from './abstract';

const generateCheckedOffersTemplate = (offers) => {
  let checkedOffersTemplate = '';
  offers.forEach((el) => {
    checkedOffersTemplate += `<li class="event__offer">
    <span class="event__offer-title">${el.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${el.price}</span>
  </li>`;
  });
  return checkedOffersTemplate;
};

const createTripPointTemplate = (tripPoint) => {
  const {destination, type, basePrice, isFavorite, dateTo, dateFrom, checkedOffers = []} = tripPoint;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dayjs(dateFrom).format('MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(dateFrom).format('H:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(dateTo).format('H:mm')}</time>
      </p>
      <p class="event__duration">${dayjs(dateTo).diff(dayjs(dateFrom), 'm')}M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${generateCheckedOffersTemplate(checkedOffers)}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPoint extends AbstractView {
  constructor (tripPoint) {
    super();
    this._tripPoint = tripPoint;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPointTemplate(this._tripPoint);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
