import SiteNavigationView from './view/site-navigation';
import EventsView from './view/events';
import TripSortingFormView from './view/trip-sorting-form';
import TripFilteringFormView from './view/fitering-form';
import EditingEventFormView from './view/editing-event-form';
import TripPointView from './view/trip-point';
import TripPriceView from './view/trip-price';
import TripRoadInfoView from './view/trip-road-info';
import { generateTripPoint } from './mock/trip-point';
import { render, RenderPosition } from './utils.js';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const renderPoint = (position, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const EditingEventFormComponent = new EditingEventFormView(tripPoint);

  const replaceCardToForm = () => {
    position.replaceChild(EditingEventFormComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormToCard = () => {
    position.replaceChild(tripPointComponent.getElement(), EditingEventFormComponent.getElement());
  };

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  EditingEventFormComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(position, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, new TripFilteringFormView().getElement(), RenderPosition.BEFOREEND);

const mainContent = document.querySelector('.trip-events');
render(mainContent, new TripSortingFormView().getElement(), RenderPosition.BEFOREEND);
render(mainContent, new EventsView().getElement(), RenderPosition.BEFOREEND);

render(siteHeaderElement, new TripRoadInfoView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);
const tripInfo = siteHeaderElement.querySelector('.trip-info');
render(tripInfo, new TripPriceView(tripPoints).getElement(), RenderPosition.BEFOREEND);

const tripList = mainContent.querySelector('.trip-events__list');
for (let i = 0; i < POINTS_COUNT; i++) {
  renderPoint(tripList, tripPoints[i]);
}
