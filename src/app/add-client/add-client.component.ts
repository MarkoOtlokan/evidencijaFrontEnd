import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { KlijentPostService } from '../klijent.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddKlijentComponent implements OnInit {
  checkoutForm;
  public klijent: any;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _klijentPostService: KlijentPostService,
    private cookie: CookieService,

  ) {
    this.checkoutForm = this.formBuilder.group({
      ime: '',
      prezime: '',
      napomena:'',
    });
   }

  ngOnInit() {
    this.klijent = {
      ime: '',
      prezime: '',
      napomena: '',
    };
    if(this.cookie.get('token') == "null"){
      window.open('http://localhost:4200/login', '_self');
    }
  }

  napraviKlijenta() {
    console.log(this.cookie.get('token'));
    this._klijentPostService.create({'ime':this.klijent.ime, 'prezime':this.klijent.prezime,'napomena':this.klijent.napomena}).subscribe(
       data => {
         // refresh the list
         this._klijentPostService.list();
         return true;
       },
       error => {
         console.error(error);
       }
    );
  }


  onSubmit(clientData) {
    // Process checkout data here
    console.warn('Your order has been submitted', clientData);
    this.klijent.ime = clientData.ime;
    this.klijent.prezime = clientData.prezime;
    this.klijent.napomena = clientData.napomena;
    this.napraviKlijenta()
    this.checkoutForm.reset();
  }

}
