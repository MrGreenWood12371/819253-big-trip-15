import AbstractDataService from './abstract-data-service';
import MockDataService from './mock';
// import ServerDataService from './server';

const DataRequestStrategy = {
  Mock: 'mock',
  Server: 'server',
};

const dataRequestStrategies = {
  [DataRequestStrategy.Mock]: new MockDataService(),
  // [DataRequestStrategy.Server]: new ServerDataService(),
};

export default class Proxy extends AbstractDataService {
  constructor(requestStrategy) {
    super();
    this._dataService = dataRequestStrategies[requestStrategy];
  }

  getTripPoints() {
    return this._dataService.getTripPoints();
  }

  getOffers() {
    return this._dataService.getOffers();
  }

  getDestinations() {
    this._dataService.getDestinations();
  }
}
