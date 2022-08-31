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
  @Input() rolName:any=""
  @Input() alterUser=new FormGroup({
    address:new FormControl('',[Validators.required,Validators.minLength(5)])
    ,age:new FormControl('',[Validators.required,Validators.min(14),Validators.max(150)])
    ,code:new FormControl('',[Validators.required,Validators.min(0)])
    ,email:new FormControl('',[Validators.minLength(5),Validators.required,Validators.pattern("[a-zñA-ZÑ0-9]@[a-zñA-ZÑ0-9].[a-zñA-ZÑ0-9]")])
    ,id:new FormControl("")
    ,login:new FormControl('',[Validators.required,Validators.minLength(4)])
    ,name:new FormControl('',[Validators.required,Validators.minLength(4)])
    ,password:new FormControl('',[Validators.required,Validators.minLength(4)])
    ,phoneNumber:new FormControl('',[Validators.required,Validators.minLength(8)])
    ,roles:new FormControl('',[Validators.required,Validators.minLength(2)])
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
      this.data.id = this.alterUser.get("id")?.value
      //console.log(this.data);
      //console.log(this.data);
      
      console.log("Data id: "+this.data.id+"");
      console.log(this.data.roles);
      console.log("roles: "+this.data.roles);
      this.data.roles.length
      
        if(!this.data.id && this.data != "" ){
          //create user
          let create:any = {}
          create = this.alterUser.value
          create.roles = [create.roles] 
          this.data.id = ""
          //console.log(create);
          //console.log(this.alterUser);
          if(this.data.roles != null)if(this.data.roles[0].length > 1){
          this._login.createUser(create).subscribe(res=>{
            Swal.fire({
              icon: 'success',
              title: 'Excelente',
              text: 'Se a creado el usuario con exito',
            })
            console.log(res);
            
            this._admin.findAll().subscribe((res:any)=>{
              this.updateUsers.emit(res)      
            })
          this.erraseMap()
                       
            
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
              this.erraseMap()
  
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Sucedio un problema',
                text: 'Faltan campos por llenar o los campos estan mal escritos',
                footer:'Recuerda: La edad debe ser mayor a 14, el codigo no se repite'
              })
              console.log(err);
              
            }
          })}
          else{
            Swal.fire({
              icon: 'error',
              title: 'Sucedio un problema',
              text: 'Faltan campos por llenar o los campos estan mal escritos',
              footer:'Recuerda: La edad debe ser mayor a 14, el codigo no se repite'
            })
          }
        }else{

          

          if(this.data.roles[0].length >= 1){
          console.log("unciona");
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Sucedio un problema',
            text: 'Faltan campos por llenar o los campos estan mal escritos',
            footer:'Recuerda: La edad debe ser mayor a 14, el codigo no se repite'
          })
        }
        /*
          
          let update:any = {}
          update = this.alterUser.value
                  let create:any = {}
          create = this.alterUser.value
          create.roles = [create.roles] 
          update.roles = [update.roles]
          Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Lo siento, aun no esta disponible el editar, puedes presionar en "Limpiar Contenido" para eliminar y crear un usuario',
          })
          //console.log(update);
          //console.log(update);
          //console.log(update);
          console.log("Se actualiza");
          this._login.updateUser(update).subscribe(res=>{
            console.log("funciona");
            
          },(err:any)=>{
            if(err.status >= 200 && err.status<300){
              
            }else{
              console.log("No funciona");
              console.log("error");
              console.log(err);
              
            }
          })
          */
         /*this._admin.deleteUser(update.id).subscribe(resExt=>{
        
          },(err:any)=>{
            if(err.status >= 200 && err.status<300){
             Swal.fire({
                icon: 'success',
                title: 'Excelente',
                text: 'Se a modificado el usuario con exito',
              })
              
                   
               
  
            }else{
             Swal.fire({
                icon: 'error',
                title: 'Sucedio un problema',
                text: 'Porfavor, revisa el contenido los datos no estan bien colocados',
              })
            }
          })
          this._login.createUser(update).subscribe(res=>{
            Swal.fire({
              icon: 'success',
              title: 'Excelente',
              text: 'Se modificado el usuario con exito',
            })      
            this._admin.findAll().subscribe((res:any)=>{
              this.updateUsers.emit(res)      
            })
            this.erraseMap() 
        })
        */
        }
          
      
      
    }else this.ifMyUserIsAdmin()
//if my user is admin
    

    //console.log(this._login.userStatus);
    
    
    
    
  }
  deleteUser(){
    
    
    if(this._login.userStatus.includes("ADMIN")){
      let id = this.alterUser.value.id,name = this.alterUser.value.login
      
      if(localStorage.getItem("userName") != name && this._login.userName != name){
        if(id != ""){
          //console.log(id);
          
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
    }else this.ifMyUserIsAdmin()
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
          login:this._login.userName==""?localStorage.getItem("userName"):this._login.userName,
          password:e.value
        }
        //console.log(user);
        
        this._login.userStatusValid(user).subscribe((res)=>{
          this._login.userStatus = JSON.stringify(res.authorities[0].authority)
          if(localStorage.getItem("token")){
            localStorage.setItem("token",res.token)
          }

        },(err)=>{
            Swal.fire({
              icon: 'error',
              title: 'Sucedio un problema',
              text: 'No se puede hacer ninguna modificacion el usuario',
            })
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
  telephonAdd(e:any){
      
    if((e.target.value.length == 3 || e.target.value.length == 7)&&e.key != "Backspace"){
      e.target.value += "-"
    }
  }
}
