import { Router } from '@angular/router';
import { LoginService } from './../../../../services/user/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-i-mainbar',
  templateUrl: './i-mainbar.component.html',
  styleUrls: ['./i-mainbar.component.scss']
})
export class IMainbarComponent implements OnInit {

  user:any={
    name:this._login.myUser.userName,
    authority:this._login.myUser.authority?.replace('"',"").replace('"',"")
  }
  constructor(
    private _login:LoginService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }
  logOut(){
    this._login.logOut()
    this._login.userStatus = ""
    this._login.userName = ""
    this._router.navigate(['login'])
  }
  goLogin(){
    this._login.userStatus = ""
    this._router.navigate(['login'])
  }
}
