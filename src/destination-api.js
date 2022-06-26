import ApiService from './framework/api-service.js';

/*const Method = {
  GET: 'GET',
  PUT: 'PUT',
};*/

export default class DestinationApiService extends ApiService {
  get destination() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }
}
