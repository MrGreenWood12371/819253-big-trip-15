import NoTripPointsView from '../view/no-points';
import EventsView from '../view/events';
import TripSortingFormView from '../view/trip-sorting-form';
import MainContentView from '../view/main-content';
import TripRoadInfoView from '../view/trip-road-info';
import TripPriceView from '../view/trip-price';
import PointPresenter from './point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common';

export const noTripPointTextList = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now',
};

export default class Trip {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;
    this._pointPresenter = new Map();

    this._noTripPointComponent = new NoTripPointsView();
    this._eventsComponent = new EventsView();
    this._tripSortingFormComponent = new TripSortingFormView();
    this._mainContentCocmponent = new MainContentView().getElement();

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints, infoElement) {
    this._tripPoints = tripPoints.slice();
    this._TripPriceComponent = new TripPriceView(this._tripPoints);
    this._TripRoadInfoComponent = new TripRoadInfoView(this._tripPoints);

    render(this._tripListContainer, this._mainContentCocmponent, RenderPosition.BEFOREEND);
    this._renderTripSortingForm();
    render(this._mainContentCocmponent, this._eventsComponent, RenderPosition.BEFOREEND);
    this._renderTripList(infoElement);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleTripPointChange(updatedTripPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedTripPoint);
    this._pointPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _renderInfo(infoElement) {
    render(infoElement, this._TripRoadInfoComponent, RenderPosition.AFTERBEGIN);
    const tripInfo = infoElement.querySelector('.trip-info');
    render(tripInfo, this._TripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderTripPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._eventsComponent, this._handleTripPointChange, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter.set(tripPoint.id, pointPresenter);
  }

  _clearTripPoints() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTripPoints() {
    this._tripPoints.slice().forEach((element) => {
      this._renderTripPoint(element);
    });
  }

  _renderTripSortingForm() {
    render(this._mainContentCocmponent, this._tripSortingFormComponent, RenderPosition.BEFOREEND);
  }

  _renderNoTripPoints() {
    render(this._mainContentCocmponent, new NoTripPointsView(noTripPointTextList.everything), RenderPosition.BEFOREEND);
  }

  _renderTripList(infoElement) {
    if (this._tripPoints.length > 0) {
      this._renderTripPoints();
      this._renderInfo(infoElement);
    }
    else {
      this._renderNoTripPoints();
    }
  }
}
