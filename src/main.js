import { createSiteNavigationTemplate } from './view/site-navigation';
import { createTripFilteringFormTemplate } from './view/fitering-form';
import { createTripSotringFormTemplate } from './view/trip-sorting-form';
import { createTripRoadInfoTemplate } from './view/trip-road-info';
import { createTripPriceTemplate } from './view/trip-price';
import { createTripPointTemplate } from './view/trip-point';
import { createEditingEventFormTemplate } from './view/editing-event-form';
import { generateTripPoint } from './mock/trip-point';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

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

render(siteHeaderElement, createTripRoadInfoTemplate(tripPoints), 'afterbegin');
const tripInfo = siteHeaderElement.querySelector('.trip-info');
render(tripInfo, createTripPriceTemplate(tripPoints), 'beforeend');

const tripList = mainContent.querySelector('.trip-events__list');
for (let i = 1; i < POINTS_COUNT; i++) {
  render(tripList, createTripPointTemplate(tripPoints[i]), 'beforeend');
}

render(tripList, createEditingEventFormTemplate(tripPoints[0]), 'afterbegin');
