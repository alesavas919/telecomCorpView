import { LoginService } from './../user/login.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminUtilitiesService {
  baseUrl=environment.baseUrl
  tokenHeader = new HttpHeaders({ "Authorization": `Bearer ${this._user.myUser.token}` }); 
  options = { headers: this.tokenHeader };  
  constructor(
    private _http:HttpClient,
    private _user:LoginService
  ) { }
  findAll():Observable<any>{
    return this._http.get(this.baseUrl+"user/findAllUsers",this.options)
  }
  deleteUser(ID:string):Observable<any>{
    return this._http.delete(this.baseUrl+`user/deleteUser`,{params:{id:ID},headers:this.options.headers})  }
  
}
