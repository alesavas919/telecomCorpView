import { Routes, Router } from '@angular/router';
import { LMainComponent } from './../l-main/l-main.component';

import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './../../../../services/user/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-l-login',
  templateUrl: './l-login.component.html',
  styleUrls: ['./l-login.component.scss']
})
export class LLoginComponent implements OnInit {
  visibility:any="visibility_off"
  user=new FormGroup({
    login:new FormControl(''),
    password:new FormControl('')
  })
  constructor(
    private _login:LoginService,
    private _router:Router,
  ) { }

  ngOnInit(): void {
  }
  @ViewChild("pass",{static:false})pass:ElementRef | undefined
  @ViewChild("saveUser",{static:false})saveUser:ElementRef|undefined
  showPassword(){
    if(this.pass != undefined){
      if(this.visibility == "visibility_off"){
        this.visibility = "visibility"
          this.pass.nativeElement.type = "text"
      }else{
        this.visibility="visibility_off"
        this.pass.nativeElement.type = "password"
      }
    }
  }
  @ViewChild(LMainComponent)main:LMainComponent|undefined
  login(){
    if(this.saveUser != undefined){      
      this._login.login(this.user.value).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido! 😀',
          text: 'Que gusto volverte a ver',
        }).then((e:any)=>{
          this._router.navigate(["/index"])
        })
        console.log(res);
        if(this.saveUser!.nativeElement.checked){
          this._login.rememberUser(res)
          if(this.main != undefined){
            this._login.setUser(res)
            this.main.user={
              userName:this._login.myUser.userName,
              authority:this._login.myUser.authority!.replace('"','').replace('"',''),
              logOut:true,
              token:res.token,
              bearer:res.bearer
            }
          }
        }else{
          if(this.main != undefined){
            this._login.setUser(res)
            this.main.user={
              userName:this._login.myUser.userName,
              authority:this._login.myUser.authority!.replace('"','').replace('"',''),
              logOut:true,
              token:res.token,
              bearer:res.bearer
            }
          }
        }
      },(err:any)=>{
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'El usuario o la contraseña son invalidos',
        })
      })
    }
  }

}
