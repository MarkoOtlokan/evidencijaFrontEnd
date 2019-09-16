import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { UserService } from './user.service';
import { KlijentPostService } from './klijent.service';
import { ProizvodPostService } from './proizvod.service';
import { UslugaPostService} from './dodajUslugu.service';
import { HttpClientModule } from '@angular/common/http';
import { StartPageComponent} from './startPage/startPage.component';
import { AddKlijentComponent} from './add-client/add-client.component';
import { AddProizvodComponent} from './add-proizvod/add-proizvod.component';
import {CookieService} from 'ngx-cookie-service';
import {StatistikaComponent} from './statistika/statistika.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'sale', component: AddSaleComponent },
      { path: 'startpage', component: StartPageComponent },
      { path: 'addclient', component: AddKlijentComponent },
      { path: 'addproizvod', component: AddProizvodComponent },
      { path: 'statistika', component: StatistikaComponent },
      { path: '**', component: LoginComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    AddSaleComponent,
    StartPageComponent,
    AddKlijentComponent,
    AddProizvodComponent,
    StatistikaComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [UserService, KlijentPostService, CookieService, ProizvodPostService,UslugaPostService],
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
