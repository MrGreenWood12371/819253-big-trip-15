import NoTripPointsView from '../view/no-points';
import EventsView from '../view/events';
import TripSortingFormView from '../view/trip-sorting-form';
import MainContentView from '../view/main-content';
import TripRoadInfoView from '../view/trip-road-info';
import TripPriceView from '../view/trip-price';
import PointPresenter from './point';
import { SortType } from '../const';
import { sortTripPointByDay, sortTripPointByPrice, sortTripPointByTime } from '../utils/trip-point';
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
    this._currentSortType = SortType.DATE;

    this._noTripPointComponent = new NoTripPointsView();
    this._eventsComponent = new EventsView();
    this._tripSortingFormComponent = new TripSortingFormView();
    this._mainContentCocmponent = new MainContentView().getElement();

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints, infoElement) {
    this._tripPoints = tripPoints.slice().sort(sortTripPointByDay);
    this._defaultTripPoints = tripPoints.slice().sort(sortTripPointByDay);
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
    this._defaultTripPoints = updateItem(this._defaultTripPoints, updatedTripPoint);
    this._pointPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripPoints = this._defaultTripPoints.slice();
        break;
      case SortType.TIME:
        this._tripPoints.sort(sortTripPointByTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortTripPointByPrice);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    const sortSelectors = document.querySelectorAll('#sort-day, #sort-time, #sort-price');
    sortSelectors.forEach((selector) => {
      selector.labels[0].dataset.sortType === sortType ? selector.checked = true : selector.checked = false;
    });

    this._sortTasks(sortType);
    this._clearTripPoints();
    this._renderTripPoints();
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
    this._tripSortingFormComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
