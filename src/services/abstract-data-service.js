export default class AbstractDataService {
  getTripPoints() {
    throw new Error('Abstract method not implemented: getTripPoints');
  }

  getOffers () {
    throw new Error('Abstract method not implemented: getOffers');
  }

  getDestinations() {
    throw new Error('Abstract method not implemented: getDestinations');
  }
}
