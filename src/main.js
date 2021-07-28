import { createSiteNavigationTemplate } from './view/site-navigation';
import { createTripFilteringFormTemplate } from './view/fitering-form';
import { createTripSotringFormTemplate } from './view/trip-sorting-form';
import { createTripRoadInfoTemplate } from './view/trip-road-info';
import { createTripPriceTemplate } from './view/trip-price';
import { createTripPointTemplate } from './view/trip-point';
import { createAddingEventFormTemplate } from './view/event-form';
import { createEditingEventFormTemplate } from './view/editing-event-form';

const POINTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, createSiteNavigationTemplate(), 'beforeend');

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, createTripFilteringFormTemplate(), 'beforeend');

const mainContent = document.querySelector('.trip-events');
render(mainContent, createTripSotringFormTemplate(), 'beforeend');

render(siteHeaderElement, createTripRoadInfoTemplate(), 'afterbegin');
const tripInfo = siteHeaderElement.querySelector('.trip-info');
render(tripInfo, createTripPriceTemplate(), 'beforeend');

const tripList = mainContent.querySelector('.trip-events__list');
for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripList, createTripPointTemplate(), 'beforeend');
}

render(tripList, createAddingEventFormTemplate(), 'afterbegin');
render(tripList, createEditingEventFormTemplate(), 'afterbegin');
