import { LoginService } from './../../../../services/user/login.service';
import { MyTel } from './../../../../interface/tel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-l-register',
  templateUrl: './l-register.component.html',
  styleUrls: ['./l-register.component.scss']
})
export class LRegisterComponent implements OnInit {
  form!:FormGroup;
  val=true
  
  constructor(
    private _login:LoginService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        name:new FormControl('',Validators.required),
        login:new FormControl('',[Validators.required]), 
        age:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),    
        password:new FormControl('',[Validators.required]),    
        code:new FormControl('',[Validators.required]),    
        address:new FormControl('',[Validators.required]),
        //tel
        phoneNumber:new FormControl('',[Validators.required]),
        roles:new FormControl(["admin"])
        /*
        area:new FormControl('',[Validators.required,Validators.min(0)]),    
        exchange:new FormControl('',[Validators.required,Validators.min(0)]),    
        subscriber:new FormControl('',[Validators.required,Validators.min(0)])
        */
      })
        /*
        */
    
  }
  
  tabOption(e:any){
    if(e.target.value.length >= 3 && e.target.value != "" && e.target.id != "subscriber"){
      if(e.target.id == "area"){
        this.form.hasError("email","email")
        document.getElementById("exchange")!.focus();
      }
      if(e.target.id == "exchange"){
        document.getElementById("subscriber")!.focus();
      }
      e.target.value = e.target.value.slice(0,3)
    }
      if(e.target.value.length >= 4 && e.target.id == "subscriber"){
       e.target.value = e.target.value.slice(0,4)
      }

    }
    telephonAdd(e:any){
      
      if((e.target.value.length == 3 || e.target.value.length == 7)&&e.key != "Backspace"){
        e.target.value += "-"
      }
    }
    register(){
      if(this.form.status != "INVALID"){
        this._login.sigInAsAdmin(this.form.value).subscribe((res:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Felicitaciones! 😀',
            text: 'Te as registrado con exito',
          })
          console.log(res);
          
        },(err:any)=>{
          console.log(err);
          if(err.status < 300 && err.status >= 200){
            Swal.fire({
              icon: 'success',
              title: 'Felicitaciones! 😀',
              text: 'Te as registrado con exito',
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Ups',
              text: 'Lo sentimos, revisa tus datos que algo falta',
            })
          }
        })
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ho ho',
          text: 'Lo sentimos, tienes que terminar de llenar los campos',
          footer: 'Te deseamos lo mejor!'
        })
      }
      
    }
}
