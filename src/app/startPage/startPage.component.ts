import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-startPage',
  templateUrl: './startPage.component.html',
  styleUrls: ['./startPage.component.css']
})
export class StartPageComponent implements OnInit {
  public user: any;
  constructor(
    private _userService: UserService,
    private cookie: CookieService,
  ) {
   }

  ngOnInit() {
    if(this.cookie.get('token') == "null"){
      window.open('http://localhost:4200/login', '_self');
    }
  }

  logout() {
    this._userService.logout();
  }

}
