import AbstractView from './abstract';

const createMainContentTemplate = () => '<section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>';

export default class MainContent extends AbstractView {
  getTemplate() {
    return createMainContentTemplate();
  }
}
