import { IIndexComponent } from './../i-index/i-index.component';
import { AdminUtilitiesService } from './../../../../services/login/admin-utilities.service';
import { LoginService } from './../../../../services/user/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-i-footer',
  templateUrl: './i-footer.component.html',
  styleUrls: ['./i-footer.component.scss']
})
export class IFooterComponent implements OnInit {
  @Input() data:any={
     address: ""
    ,age: ""
    ,code: ""
    ,email: ""
    ,login: ""
    ,name: ""
    ,password: ""
    ,phoneNumber: ""
    ,roles:[{rolName:""}]
  } 
  @Input() alterUser=new FormGroup({
    address:new FormControl('',[Validators.required])
    ,age:new FormControl('',[Validators.required])
    ,code:new FormControl('',[Validators.required])
    ,email:new FormControl('',[Validators.required])
    ,id:new FormControl("")
    ,login:new FormControl('',[Validators.required])
    ,name:new FormControl('',[Validators.required])
    ,password:new FormControl('',[Validators.required])
    ,phoneNumber:new FormControl('',[Validators.required])
    ,roles:new FormControl('',[Validators.required])
  })

  json=JSON
  @ViewChild(IIndexComponent)indexComp:IIndexComponent|undefined//
  constructor(
    private _login:LoginService,
    private _admin:AdminUtilitiesService
  ) { }

  ngOnInit(): void {

  }
  //@Input() updateUsers:any
  @Output() private updateUsers = new EventEmitter();
  saveUser(){
    
    if(this._login.userStatus.includes("ADMIN")){
      this.data.address = this.alterUser.get("address")?.value
      this.data.age = this.alterUser.get("age")?.value
      this.data.code = this.alterUser.get("code")?.value
      this.data.email = this.alterUser.get("email")?.value
      this.data.login = this.alterUser.get("login")?.value
      this.data.name = this.alterUser.get("name")?.value
      this.data.password = this.alterUser.get("password")?.value
      this.data.phoneNumber = this.alterUser.get("phoneNumber")?.value
      let list = [this.alterUser.get("roles")?.value]
      this.data.roles = list
      //console.log(this.data);
      console.log(this.data);
      
      if(!this.data.id){
        //create user
        let create:any = {}
        create = this.alterUser.value
        create.roles = [create.roles] 
        this._login.createUser(create).subscribe(res=>{
          Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Se a creado el usuario con exito',
          })
          this._admin.findAll().subscribe((res:any)=>{
            this.updateUsers.emit(res)      
          })
                     
          
        },(err:any)=>{
          if(err.status >= 200 && err.status<300){
            Swal.fire({
              icon: 'success',
              title: 'Excelente',
              text: 'Se a creado el usuario con exito',
            })
            
            
            this._admin.findAll().subscribe((res:any)=>{
              this.updateUsers.emit(res)
            })

          }
        })
        this.erraseMap()
      }/*else{
        let update:any = {}
        update = this.alterUser.value
        update.roles = null 
        update.id = null
        this._login.updateUser(update).subscribe((res:any)=>{
          console.log(res);
        },err=>{
          console.log(err);
          
        })
      }*/
      
    }
//if my user is admin
    this.ifMyUserIsAdmin()

    //console.log(this._login.userStatus);
    
    
    
    
  }
  deleteUser(){
    this.ifMyUserIsAdmin()
    
    if(this._login.userStatus.includes("ADMIN")){
      let id = this.alterUser.value.id,name = this.alterUser.value.login
      console.log('====================================');
      console.log(name);
      console.log('====================================');
      console.log('====================================');
      console.log(localStorage.getItem("userName"));
      console.log('====================================');
      if(localStorage.getItem("userName") != name){
        if(id != ""){
          console.log(id);
          
          this._admin.deleteUser(id).subscribe(res=>{
            Swal.fire({
              icon: 'success',
              title: 'Excelente',
              text: 'As eliminado el usuario con exito',
            })
  
            this._admin.findAll().subscribe((res:any)=>{
              this.updateUsers.emit(res)   
            })
          },(err:any)=>{
            if(err.status >= 200 && err.status<300){
              Swal.fire({
                icon: 'success',
                title: 'Excelente',
                text: 'As eliminado el usuario con exito',
              })
              
              
              this._admin.findAll().subscribe((res:any)=>{
                this.updateUsers.emit(res) 
              })
  
            }
          })
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Lo sentimos',
            text: 'Pero el id se encuentra vacio, seleciona el usuario otra vez',
          })
        }
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Ho ho!',
          text: 'No puedes elimintarte a ti mismo',
        })
      }
      this.erraseMap()
    }
//if my user is admin
  }

  //user condition
  ifMyUserIsAdmin(){
    if(this._login.userStatus === ""){
      Swal.fire({
        title: 'Por seguridad, escribe tu contraseña',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
      }).then((e:any)=>{
        //this._router.navigate(["/index"])
    
        let user = {
          login:localStorage.getItem("userName"),
          password:e.value
        }
        
        this._login.userStatusValid(user).subscribe((res)=>{
          this._login.userStatus = JSON.stringify(res.authorities[0].authority)
          localStorage.setItem("token",res.token)
          
        },(err)=>{
          console.log(err);
        })        
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos!',
        text: 'No tienes permisos de administrador',
      })
    }
  }
  /***************************************************/
  erraseMap(){
    this.alterUser.reset()

    this.data={
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
    
  }
}
