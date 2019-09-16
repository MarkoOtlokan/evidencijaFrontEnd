import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { KlijentPostService } from '../klijent.service';
import { UslugaPostService} from '../dodajUslugu.service';
import {CookieService} from 'ngx-cookie-service';
import {ProizvodPostService} from '../proizvod.service';

export interface Klijent {
  ime: string;
  id: number;
}

export interface Proizvod {
  naziv: string;
  id: number;
  cena: number;
}

export interface Usluga {
  id: number;
  klijentId: number;
  proizvodId:number;
  proizvodNaziv: string;
  napomena: string;
  cena: number;
  placeno: string;
  datum: string;
  sat: string;
}

@Component({
  selector: 'app-statistika-sale',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {
  checkoutForm;
  public klijenti;
  public proizvodi;
  klijentela: Klijent[] = [];
  sveUsluge: Usluga[] = [];
  uslugeKorisnika: Usluga[] = [];
  sviProizvodi: Proizvod[] = [];
  proizvodTmp;
  klijentTmp;
  uslugaTmp;
  usluge;
  platio;
  potrosio = 0;
  duzan = 0;
  cenaOcuvaj = 0.0;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _klijentPostService: KlijentPostService,
    private _uslugaPostService: UslugaPostService,
    private cookie: CookieService,
    private _proizvodPostService: ProizvodPostService,

  ) {
    this.checkoutForm = this.formBuilder.group({
      klijent: 0,
    });
   }

  ngOnInit() {
    this.getProizvodi();
    this.getUsluge();
    this.getKlijenti();
    if(this.cookie.get('token') == "null"){
      window.open('http://localhost:4200/login', '_self');
    }
  }

  onSubmit(data) {
    // Process checkout data here
  //  data.cena = this.checkoutForm.cena;
    console.log(data);
    this.ispisiPodatke(data.klijent);
  }

  ispisiPodatke(idKlijent){
    this.potrosio = 0;
    this.duzan = 0;
    this.uslugeKorisnika = [];
    for(let u of this.sveUsluge){
      if(u.klijentId == idKlijent){
        this.uslugeKorisnika.push(u);
        this.potrosio += u.cena;
        console.log(u.placeno);
        if(u.placeno == "NIJE PLACENO"){
          this.duzan += u.cena;
        }
        console.log(u);
      }
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
          console.log(k.prezime);
          this.klijentela.push({ime: k.ime, id: k.id});
        }
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading posts')
    );
  }

  getUsluge() {
    this._uslugaPostService.list().subscribe(
      data => {
        this.uslugaTmp = data;//samo zbog erora
        this.usluge = this.uslugaTmp.results;
        console.log(this.usluge);
        for (let u of this.usluge) {
          console.log(u.status);
          if(u.status == "2"){
            this.platio = "NIJE PLACENO";
          }
          else{
            this.platio = "PLACENO";
          }
          this.sveUsluge.push({
            id: u.id,
            klijentId: u.klijent,
            proizvodId: u.proizvod,
            proizvodNaziv: this.sviProizvodi[u.proizvod].naziv,
            napomena: u.napomena,
            cena: u.cena,
            placeno: this.platio,
            datum: u.created.split("T")[0],
            sat : u.created.split("T")[1].split(".")[0]
          });
        }
      },
      err => console.error(err),
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
