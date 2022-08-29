import { LoginService } from './../../../../services/user/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-l-main',
  templateUrl: './l-main.component.html',
  styleUrls: ['./l-main.component.scss']
})
export class LMainComponent implements OnInit {
  user={
    userName:this._login.myUser.userName,
    authority:this._login.myUser.authority?.replace('"','').replace('"',''),
    logOut:localStorage.getItem("userName") == undefined?false:true,
    token:this._login.myUser.token,
    bearer:this._login.myUser.bearer
  }
  constructor(
    private _login:LoginService
  ) { }

  ngOnInit(): void {
    
    
  }
  logOut(){
    this._login.logOut()
    this.user.userName = ""
    this.user.authority = ""
    this.user.logOut = false
  }
  show(){
    console.log(this.user);
  }

}
