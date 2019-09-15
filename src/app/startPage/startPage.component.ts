import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-startPage',
  templateUrl: './startPage.component.html',
  styleUrls: ['./startPage.component.css']
})
export class StartPageComponent implements OnInit {
  public user: any;
  constructor(
    private _userService: UserService,
  ) {
   }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
  }

}
