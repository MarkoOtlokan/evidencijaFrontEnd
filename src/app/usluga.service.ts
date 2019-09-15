import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable()
export class UslugaPostService {

  constructor(private http: HttpClient, private _userService: UserService) {
  }

  // Uses http.get() to load data from a single API endpoint
  list() {
    return this.http.get('http://0.0.0.0:8001/api/v1/usluga/');
  }

  // send a POST request to the API to create a new data object
  create(post, token) {
    return this.http.post('http://0.0.0.0:8001/api/v1/usluga/', JSON.stringify(post), this.getHttpOptions());
  }

  // helper function to build the HTTP headers
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._userService.token
      })
    };
  }

}
