import { LoginService } from './../../../../services/user/login.service';
import { AdminUtilitiesService } from './../../../../services/login/admin-utilities.service';
import { Component, OnInit, Output, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-i-index',
  templateUrl: './i-index.component.html',
  styleUrls: ['./i-index.component.scss']
})
export class IIndexComponent implements OnInit,OnChanges {
  person:any={
    address: ""
    ,age: ""
    ,code: ""
    ,email: ""
    ,id: ""
    ,login: ""
    ,name: ""
    ,password: ""
    ,phoneNumber: ""
    ,roles:[{rolName:""}]
  }
  alterPerson=new FormGroup({
    address:new FormControl('')
   ,age:new FormControl('')
   ,code:new FormControl('')
   ,email:new FormControl('')
   ,id:new FormControl('')
   ,login:new FormControl('')
   ,name:new FormControl('')
   ,password:new FormControl('')
   ,phoneNumber:new FormControl('')
   ,roles:new FormControl("")
 })
  users:any=[]
  json = JSON
  constructor(
    private _admin:AdminUtilitiesService,
    private _user:LoginService
  ) { }
  ngOnInit(): void {
    this._admin.findAll().subscribe((res:any)=>{
      this.users = res      
      /*
      this.users.map((el:any,i:number,list:any)=>{
        el.roles = [el.roles[0].rolName]
        
      })
      */
    })
  }
  ngOnChanges(){

  }
  loadingData(e:any){
    this.users = e
  }
  updateUsers:any=[]
  selected(e:any){
    //console.log(e.target.parentNode.rowIndex);
    let lista = []
    
    this.person = this.users[e.target.parentNode.rowIndex-1]
    this.person.password = ""
    this.alterPerson=new FormGroup({
      address:new FormControl(this.person.address,[Validators.required])
     ,age:new FormControl(this.person.age,[Validators.required])
     ,code:new FormControl(this.person.code,[Validators.required])
     ,email:new FormControl(this.person.email,[Validators.required])
     ,id:new FormControl(this.person.id)
     ,login:new FormControl(this.person.login,[Validators.required])
     ,name:new FormControl(this.person.name,[Validators.required])
     ,password:new FormControl("",[Validators.required])
     ,phoneNumber:new FormControl(this.person.phoneNumber,[Validators.required])
     ,roles:new FormControl(this.person.roles[0].rolName,[Validators.required])
   })
    //this.person.roles = this.person.roles[0].rolName
    //console.log(this.alterPerson.value);
    
    window.scrollTo(0,window.screen.availHeight)
  }
  updown(e:any){
    let value = e.target.localName == "div"?e.target.firstChild:e.target
    if(value.textContent == "arrow_upward"){
      window.scrollTo(0,0)
    }else{
      window.scrollTo(0,window.screen.height)
    }
    
  }
  setUsers(e:any){
    this.users = e
  }
}
