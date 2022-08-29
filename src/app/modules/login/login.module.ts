import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LLoginComponent } from './comp/l-login/l-login.component';
import { LRegisterComponent } from './comp/l-register/l-register.component';
import { LMainComponent } from './comp/l-main/l-main.component';
import { LFooterComponent } from './comp/l-footer/l-footer.component';

//decoration
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


//ng g c modules/login/comp/l-main --skip-tests

@NgModule({
  declarations: [
    LLoginComponent,
    LRegisterComponent,
    LMainComponent,
    LFooterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    //decoration
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
  ]
})
export class LoginModule { }
