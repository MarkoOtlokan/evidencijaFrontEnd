import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  uspeh;
  us : UserService;
  public user: any;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
  ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
   }

  ngOnInit() {

    this.logout();

    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.uspeh = this._userService.login({'username':this.user.username, 'password':this.user.password});
    this.checkoutForm.reset();
    if(this.uspeh == 0){
      alert("prijava nije uspela");
    }
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

  onSubmit(userData) {
    this.user.username = userData.username;
    this.user.password = userData.password;
    this.login();
    this.checkoutForm.reset();
  }

}
