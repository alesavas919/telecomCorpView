import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"index"
  },
  {
    path:"index",
    loadChildren: ()=>import("./modules/index/index.module").then(m=>m.IndexModule),
    canActivate:[
      LoginGuard,
    ],
    

  },
  {
    path:"login",
    loadChildren: ()=>import("./modules/login/login.module").then(m=>m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
