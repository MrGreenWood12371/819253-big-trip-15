import SiteNavigationView from './view/site-navigation';
import TripFilteringFormView from './view/fitering-form';
import { render, RenderPosition } from './utils/render';
import ProxyDataService from './services/proxy';
import TripPresenter from './presenter/trip';

const proxyDataService = new ProxyDataService('mock');

const tripPoints = proxyDataService.getTripPoints();

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderConstrols = siteHeaderElement.querySelector('.trip-controls');

const siteMenu = siteHeaderConstrols.querySelector('.trip-controls__navigation');
render(siteMenu, new SiteNavigationView(), RenderPosition.BEFOREEND);

const siteFilter = siteHeaderConstrols.querySelector('.trip-controls__filters');
render(siteFilter, new TripFilteringFormView(), RenderPosition.BEFOREEND);

const mainContainer = document.querySelector('.page-main').querySelector('.page-body__container');
const tripPresenter = new TripPresenter(mainContainer);
tripPresenter.init(tripPoints, siteHeaderElement, proxyDataService.getOffers());
