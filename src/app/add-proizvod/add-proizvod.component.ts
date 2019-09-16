import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { ProizvodPostService } from '../proizvod.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-add-proizvod',
  templateUrl: './add-proizvod.component.html',
  styleUrls: ['./add-proizvod.component.css']
})
export class AddProizvodComponent implements OnInit {
  checkoutForm;
  public proizvod: any;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _proizvodPostService: ProizvodPostService,
    private cookie: CookieService,

  ) {
    this.checkoutForm = this.formBuilder.group({
      naziv: '',
      cena: '',
      napomena:'',
    });
   }

  ngOnInit() {
    if(this.cookie.get('token') == "null"){
      window.open('http://localhost:4200/login', '_self');
    }

  }

  napraviProizvod(proizvodData) {
    this._proizvodPostService.create({'naziv':proizvodData.naziv, 'cena':proizvodData.cena,'napomena':proizvodData.napomena}).subscribe(
       data => {
         // refresh the list
         this.checkoutForm.reset();
         alert("Proizvod je uspesno dodat");
         this._proizvodPostService.list();
         return true;
       },
       error => {
         alert("\tDOSLO JE DO GRESKE \n proverite da li ste popunili sva polja");
         console.error(error);
       }
    );
  }


  onSubmit(proizvodData) {
    // Process checkout data here
    console.warn('Your order has been submitted', proizvodData);
    this.napraviProizvod(proizvodData)

  }

}
