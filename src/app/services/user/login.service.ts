import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myUser={
    token:localStorage.getItem("token")
    ,bearer:localStorage.getItem("bearer")
    ,userName:localStorage.getItem("userName")
    ,authority:localStorage.getItem("authority")//!.replace('"','').replace('"','')
    ,logOut:localStorage.getItem("userName")!=null?true:false
  }
  private baseUrl=environment.baseUrl
  private tokenHeader = new HttpHeaders({ "Authorization": `Bearer ${this.myUser.token}` }); 
  private options = { headers: this.tokenHeader };  
  userStatus:string = ""

  constructor(
    private _http: HttpClient,
  ) { }
  login(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"auth/login",user)
  }
  sigInAsAdmin(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"auth/newUser",user)
  }
  createUser(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"auth/newUser",user)
  }
  updateUser(user:any):Observable<any>{
    return this._http.put(this.baseUrl+"user/updateUser",user,this.options)
  }
  userStatusValid(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"auth/login",user)
  }
  rememberUser(token:any){
    localStorage.setItem("token",token.token)
    localStorage.setItem("bearer",token.bearer)
    localStorage.setItem("userName",token.userName)
    localStorage.setItem("authority",JSON.stringify(token.authorities[0].authority))
    this.myUser.token = localStorage.getItem("token")!
    this.myUser.bearer = localStorage.getItem("bearer")!
    this.myUser.userName = localStorage.getItem("userName")!
    this.myUser.authority = localStorage.getItem("authority")!.replace('"','').replace('"','')
    
   }
  setUser(token:any){
    this.myUser.token = token.token
    this.myUser.bearer = token.bearer
    this.myUser.userName = token.userName
    this.myUser.authority = JSON.stringify(token.authorities[0].authority)
    this.myUser.logOut = true
  }
  logOut(){
    this.myUser={
      token:""
      ,bearer:""
      ,userName:""
      ,authority:""
      ,logOut:false
    }
    localStorage.clear()
  }
}
