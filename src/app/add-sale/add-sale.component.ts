import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { KlijentPostService } from '../klijent.service';
import { ProizvodPostService } from '../proizvod.service';
import { UslugaPostService} from '../dodajUslugu.service';
import {CookieService} from 'ngx-cookie-service';

export interface Klijent {
  ime: string;
  id: number;
}

export interface Proizvod {
  naziv: string;
  id: number;
  cena: number;
}

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {
  checkoutForm;
  public klijenti;
  public proizvodi;
  klijentela: Klijent[] = [];
  sviProizvodi: Proizvod[] = [];
  klijentTmp;
  proizvodTmp;
  cenaOcuvaj = 0.0;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _klijentPostService: KlijentPostService,
    private _proizvodPostService: ProizvodPostService,
    private _uslugaPostService: UslugaPostService,
    private cookie: CookieService,

  ) {
    this.checkoutForm = this.formBuilder.group({
      proizvod: 0,
      klijent: 0,
      napomena:'',
      kolicina:1,
      cena:0,
      platio:0,
    });
   }

  ngOnInit() {
    this.getProizvodi();
    this.getKlijenti();
    if(this.cookie.get('token') == "null"){
      window.open('http://localhost:4200/login', '_self');
    }
  }

  napraviUslugu(data) {
    this._uslugaPostService.create({
      "cena": data.cena,
      "napomena": data.napomena,
      "status": parseInt(data.platio, 10),
      "radnik": 1,
      "klijent": parseInt(data.klijent, 10),
      "proizvod": parseInt(data.proizvod, 10),
    }).subscribe(
       data => {
         // refresh the list
         this.checkoutForm.reset();
         alert("Usluga je uspesno dodata");
         this._uslugaPostService.list();
         return true;
       },
       error => {
         alert("\tDOSLO JE DO GRESKE \n proverite da li ste popunili sva polja");
         console.error(error);
       }
    );
  }


  onSubmit(data) {
    // Process checkout data here
    data.cena = this.checkoutForm.cena;
    this.napraviUslugu(data)
  }

  dodajCenu(data){
    for( let p of this.sviProizvodi){
      if(data == p.id){
        console.log(p.cena);
        this.checkoutForm.cena = p.cena;
        this.cenaOcuvaj = p.cena;
      }
    }
  }

  izracunajCenu(data){
    if(data != 0){
      this.checkoutForm.cena = this.cenaOcuvaj * data;
      console.log(this.checkoutForm.cena + " nova cena");
    }
  }

  getKlijenti() {
    this._klijentPostService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.klijentTmp = data;//samo zbog erora
        this.klijenti = this.klijentTmp.results;
        console.log(this.klijenti);
        for (let k of this.klijenti) {
          console.log(k.ime);
          this.klijentela.push({ime: k.ime, id: k.id});
        }
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading posts')
    );
  }

  getProizvodi() {
    this._proizvodPostService.list().subscribe(
      data => {
        this.proizvodTmp = data;//samo zbog erora
        this.proizvodi = this.proizvodTmp.results;
        console.log(this.proizvodi);
        for (let p of this.proizvodi) {
          console.log(p.naziv);
          this.sviProizvodi.push({naziv: p.naziv, id: p.id, cena: p.cena});
        }
      },
      err => console.error(err),
      () => console.log('done loading posts')
    );
  }
}
