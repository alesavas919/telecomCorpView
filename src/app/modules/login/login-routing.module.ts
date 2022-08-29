import { LRegisterComponent } from './comp/l-register/l-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LLoginComponent } from './comp/l-login/l-login.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"login"
  },
  {
    path:"login",
    component:LLoginComponent
  },
  {
    path:"register",
    component:LRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
