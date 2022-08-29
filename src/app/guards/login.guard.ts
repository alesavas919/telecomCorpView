import { LoginService } from './../services/user/login.service';
import { LMainComponent } from './../modules/login/comp/l-main/l-main.component';
import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(
    private _login:LoginService,
    private _router:Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let exit = this._login.myUser.logOut;
    if(!exit)this._router.navigate(["login/login"])
    return this._login.myUser.logOut;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
