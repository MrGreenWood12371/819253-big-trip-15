import AbstractView from './abstract';

const createEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class Events extends AbstractView {
  getTemplate() {
    return createEventsTemplate();
  }
}
