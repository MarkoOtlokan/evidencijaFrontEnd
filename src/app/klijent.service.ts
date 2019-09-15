import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {CookieService} from 'ngx-cookie-service';
@Injectable()
export class KlijentPostService {

  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private cookie: CookieService,
  ) {
  }

  // Uses http.get() to load data from a single API endpoint
  list() {
    return this.http.get('http://0.0.0.0:8001/api/v1/klijent/');
  }

  // send a POST request to the API to create a new data object
  create(post) {
    return this.http.post(
      'http://0.0.0.0:8001/api/v1/klijent/',
      JSON.stringify(post),
      this.getHttpOptions());
  }

  // helper function to build the HTTP headers
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.cookie.get('token')
      })
    };
  }

}
