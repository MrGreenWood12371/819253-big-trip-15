import dayjs from 'dayjs';
import SmartView from './smart';
import { generateDestination } from '../mock/destination';
import { generateTripOffer } from '../mock/trip-offers';
import { stockPoint } from '../mock/stock-point';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const generatePointTypeTemplate = (type, destination) => (
  `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>`
);

const generatePointPriceTemplate = (basePrice) => (
  `<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
</div>`
);

const generateOffersTemplate = (offers, isOffers) => {
  let offersTemplate = '';
  for (let i = 0; i < offers.length; i++) {
    offersTemplate += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers[i].name}-1" type="checkbox" name="event-offer-${offers[i].name}">
    <label class="event__offer-label" for="event-offer-${offers[i].name}-1">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </label>
  </div> `;
  }

  return isOffers ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersTemplate}
      </div>
  </section>` : '';
};

const generatePhotosTemplate = (destination) => {
  let photosTemplate = '<div class="event__photos-container"><div class="event__photos-tape">';
  for (let i = 0; i < destination.pictures.length; i++) {
    photosTemplate += `
      <img class="event__photo" src="${destination.pictures[i].src}" alt="Event photo">`;
  }
  photosTemplate += '</div></div>';
  return photosTemplate;
};

const generateEditingDateTemplate = (dateFrom, dateTo) => (
  `<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">From</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">To</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
</div>`
);

const generateDestinationTemplate = (destination, isDestinationDescription, isDestinationPictures) => (
  `${isDestinationDescription ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
  ${isDestinationPictures ? generatePhotosTemplate(destination) : ''}
</section>` : ''}`
);

const createEditingEventFormTemplate = (data) => {

  const {
    destination,
    type,
    basePrice,
    dateTo = dayjs().toDate(),
    dateFrom = dayjs().toDate(),
    offers,
    isOffers,
    isDestinationDescription,
    isDestinationPictures,
  } = data;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      ${generatePointTypeTemplate(type, destination)}

      ${generateEditingDateTemplate(dateFrom, dateTo)}

      ${generatePointPriceTemplate(basePrice)}

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${generateOffersTemplate(offers, isOffers)}
    ${generateDestinationTemplate(destination, isDestinationDescription, isDestinationPictures)}
    </section>
  </form>
</li>`;
};

export default class EditingEventForm extends SmartView {
  constructor(tripPoint = stockPoint) {
    super();
    this._data = EditingEventForm.parsePointToData(tripPoint);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._tripTypeChangeHandler = this._tripTypeChangeHandler.bind(this);
    this._tripDestinationChangeHandler = this._tripDestinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createEditingEventFormTemplate(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _tripTypeChangeHandler(evt) {
    evt.preventDefault();
    const newOffers = generateTripOffer().filter((item) => item.type === evt.target.value)[0].offers;

    this.updateData({
      type: evt.target.value,
      offers: newOffers,
      isOffers: newOffers.length > 0,
    });
    this.getElement().querySelector(`#event-type-${evt.target.value}-1`).checked = true;
  }

  _tripDestinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: generateDestination(evt.target.value),
    });
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData(
      {
        dateFrom: userDate,
      },
      true,
    );
  }

  _dateToChangeHandler([userDate]) {
    this.updateData(
      {
        dateTo: userDate,
      },
      true,
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditFormClickHandler(this._callback.editClick);
    this._setDatepickers();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setEditFormClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _setDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        // eslint-disable-next-line camelcase
        time_24hr: true,
        enableTime: true,
        defaultDate: this._data.dateFrom,
        onChange: this._dateFromChangeHandler,
      },
    );

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        minDate: 'today',
        // eslint-disable-next-line camelcase
        time_24hr: true,
        enableTime: true,
        defaultDate: this._data.dateTo,
        onChange: this._dateToChangeHandler,
      },
    );
  }

  reset(point) {
    this.updateData(EditingEventForm.parsePointToData(point));
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('input[name=event-type]')
      .forEach((element) => {
        element.addEventListener('click', this._tripTypeChangeHandler);
      });

    this.getElement()
      .querySelector('input[name=event-destination]')
      .addEventListener('change', this._tripDestinationChangeHandler);
    this.getElement().querySelector(`#event-type-${this._data.type}-1`).checked = true;
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isOffers: point.offers.length > 0,
        isDestinationDescription: point.destination.description !== '',
        isDestinationPictures: point.destination.pictures.length > 0,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDestinationDescription;
    delete data.isDestinationPictures;

    return data;
  }
}
