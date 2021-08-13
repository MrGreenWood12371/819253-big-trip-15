import SiteNavigationView from './view/site-navigation';
import EventsView from './view/events';
import TripSortingFormView from './view/trip-sorting-form';
import TripFilteringFormView from './view/fitering-form';
import EditingEventFormView from './view/editing-event-form';
import TripPointView from './view/trip-point';
import TripPriceView from './view/trip-price';
import TripRoadInfoView from './view/trip-road-info';
import NoTripPointsView from './view/no-points';
import { noTripPointTextList } from './utils.js';
import { generateTripPoint } from './mock/trip-point';
import { render, RenderPosition } from './utils.js';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const renderPoint = (element, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const editingEventFormComponent = new EditingEventFormView(tripPoint);

  const replaceCardToForm = () => {
    element.replaceChild(editingEventFormComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormToCard = () => {
    element.replaceChild(tripPointComponent.getElement(), editingEventFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onArrowClick = () => {
    replaceFormToCard();
  };

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editingEventFormComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editingEventFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onArrowClick);

  render(element, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, new TripFilteringFormView().getElement(), RenderPosition.BEFOREEND);

const mainContent = document.querySelector('.trip-events');
render(mainContent, new TripSortingFormView().getElement(), RenderPosition.BEFOREEND);

if (tripPoints.length > 0) {
  render(mainContent, new EventsView().getElement(), RenderPosition.BEFOREEND);
  const tripList = mainContent.querySelector('.trip-events__list');
  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(tripList, tripPoints[i]);
  }

  render(siteHeaderElement, new TripRoadInfoView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);
  const tripInfo = siteHeaderElement.querySelector('.trip-info');
  render(tripInfo, new TripPriceView(tripPoints).getElement(), RenderPosition.BEFOREEND);
}
else {
  render(mainContent, new NoTripPointsView(noTripPointTextList.everything).getElement(), RenderPosition.BEFOREEND);
}
