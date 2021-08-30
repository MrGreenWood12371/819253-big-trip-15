import TripPointView from '../view/trip-point';
import EditingEventFormView from '../view/editing-event-form';
import { render, RenderPosition, replace, remove } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(eventsContainer, changeData, changeMode, tripOffers) {
    this._eventsComponent = eventsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._tripOffers = tripOffers;

    this._tripPointComponent = null;
    this._editingEventFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditButtonClick = this._handleEditButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevEditingEventFormComponent = this._editingEventFormComponent;

    this._tripPointComponent = new TripPointView(this._tripPoint);
    this._editingEventFormComponent = new EditingEventFormView(this._tripPoint, this._tripOffers);

    this._tripPointComponent.setEditClickHandler(this._handleEditButtonClick);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editingEventFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._editingEventFormComponent.setEditFormClickHandler(() => {
      this._replaceFormToCard();
    });

    if(prevTripPointComponent === null || prevEditingEventFormComponent === null) {
      render(this._eventsComponent, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if(this._mode === Mode.EDITING) {
      replace(this._editingEventFormComponent, prevEditingEventFormComponent);
    }

    remove(prevTripPointComponent);
    remove(prevEditingEventFormComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._editingEventFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._editingEventFormComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._editingEventFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._editingEventFormComponent.reset(this._tripPoint);
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._tripPoint,
        {
          isFavorite: !this._tripPoint.isFavorite,
        },
      ),
    );
  }

  _handleEditButtonClick() {
    this._replaceCardToForm();
    this._editingEventFormComponent.reset(this._tripPoint);
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToCard();
  }
}
