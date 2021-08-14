import AbstractView from './abstract';

const createNoTripPointsTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class NoTripPoints extends AbstractView {
  constructor (text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return createNoTripPointsTemplate(this._text);
  }
}
