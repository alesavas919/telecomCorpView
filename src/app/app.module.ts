import { CommonModule } from '@angular/common';
import { IndexModule } from './modules/index/index.module';
import { LoginModule } from './modules/login/login.module';
import { AppComponent } from './app/app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

/* ----- install -------
npm i sweetalert2
npm i bootstrap
ng add @angular/material
 ----- install -------*/
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    //modules
    IndexModule,
    LoginModule,
    //decoration
    //imports
    FormsModule,
    ReactiveFormsModule,//USE WITH formControl
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
