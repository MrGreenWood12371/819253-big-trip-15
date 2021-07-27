import { createSiteMenuTemplate } from './view/site-menu';
import { createSiteFilterTemplate } from './view/site-fiter';
import { createTripSortTemplate } from './view/trip-sort';
import { createTripRoadInfoTemplate } from './view/trip-road-info';
import { createTripPriceTemplate } from './view/trip-price';
import { createTripPointTemplate } from './view/trip-point';
import { createPointAddTemplate } from './view/point-add-form';
import { createEditPointTemplate } from './view/point-edit-form';

const POINTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeader.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, createSiteMenuTemplate(), 'beforeend');

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, createSiteFilterTemplate(), 'beforeend');

const mainContent = document.querySelector('.trip-events');
render(mainContent, createTripSortTemplate(), 'beforeend');

render(siteHeader, createTripRoadInfoTemplate(), 'afterbegin');
const tripInfo = siteHeader.querySelector('.trip-info');
render(tripInfo, createTripPriceTemplate(), 'beforeend');

const tripList = mainContent.querySelector('.trip-events__list');
for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripList, createTripPointTemplate(), 'beforeend');
}

render(tripList, createPointAddTemplate(), 'afterbegin');
render(tripList, createEditPointTemplate(), 'afterbegin');
