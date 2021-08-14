import SiteNavigationView from './view/site-navigation';
import EventsView from './view/events';
import TripSortingFormView from './view/trip-sorting-form';
import TripFilteringFormView from './view/fitering-form';
import EditingEventFormView from './view/editing-event-form';
import TripPointView from './view/trip-point';
import TripPriceView from './view/trip-price';
import TripRoadInfoView from './view/trip-road-info';
import NoTripPointsView from './view/no-points';
import { noTripPointTextList } from './utils/trip-point';
import { generateTripPoint } from './mock/trip-point';
import { render, RenderPosition, replace } from './utils/render';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const renderPoint = (element, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const editingEventFormComponent = new EditingEventFormView(tripPoint);

  const replaceCardToForm = () => {
    replace(editingEventFormComponent, tripPointComponent);
  };

  const replaceFormToCard = () => {
    replace(tripPointComponent, editingEventFormComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.setEditClickHandler( () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editingEventFormComponent.setFormSubmitHandler( () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editingEventFormComponent.setEditFormClickHandler( () => {
    replaceFormToCard();
  });

  render(element, tripPointComponent, RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, new SiteNavigationView(), RenderPosition.BEFOREEND);

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, new TripFilteringFormView(), RenderPosition.BEFOREEND);

const mainContent = document.querySelector('.trip-events');
render(mainContent, new TripSortingFormView(), RenderPosition.BEFOREEND);

if (tripPoints.length > 0) {
  render(mainContent, new EventsView(), RenderPosition.BEFOREEND);
  const tripList = mainContent.querySelector('.trip-events__list');
  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(tripList, tripPoints[i]);
  }

  render(siteHeaderElement, new TripRoadInfoView(tripPoints), RenderPosition.AFTERBEGIN);
  const tripInfo = siteHeaderElement.querySelector('.trip-info');
  render(tripInfo, new TripPriceView(tripPoints), RenderPosition.BEFOREEND);
}
else {
  render(mainContent, new NoTripPointsView(noTripPointTextList.everything), RenderPosition.BEFOREEND);
}
