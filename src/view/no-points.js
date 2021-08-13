import { createElement } from '../utils';

const createNoTripPointsTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class NoTripPoints {
  constructor (text) {
    this._element = null;
    this._text = text;
  }

  getTemplate() {
    return createNoTripPointsTemplate(this._text);
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
