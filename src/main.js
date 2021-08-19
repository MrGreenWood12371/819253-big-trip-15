import SiteNavigationView from './view/site-navigation';
import TripFilteringFormView from './view/fitering-form';
import { generateTripPoint } from './mock/trip-point';
import { render, RenderPosition } from './utils/render';
import TripPresenter from './presenter/trip';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, new SiteNavigationView(), RenderPosition.BEFOREEND);

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, new TripFilteringFormView(), RenderPosition.BEFOREEND);

const mainContainer = document.querySelector('.page-main').querySelector('.page-body__container');
const tripPresenter = new TripPresenter(mainContainer);
tripPresenter.init(tripPoints, siteHeaderElement);
