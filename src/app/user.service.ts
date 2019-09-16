import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(
      'http://0.0.0.0:8001/login/',
      JSON.stringify(user),
      this.httpOptions
    ).subscribe(
      data => {
        this.updateData(data['token']);
        this.cookie.set('token', this.token);
        window.open('http://localhost:4200/startpage', '_self');
      },
      err => {
        console.error('login error', err);
        this.errors = err['error'];
        return 0;
      }
    );
    return 0;
  }

  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  public refreshToken() {
    this.http.post('http://138.68.180.165:8001/login', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        console.log('refresh success', data);
        this.updateData(data['token']);

      },
      err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.cookie.set('token', null);
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  public getToken(){
    return this.token;
  }

}
