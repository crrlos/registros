import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const firebase : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private correo : string;
  private password : string;

  private errores = [false,false];

 private ocultarLogin = false;

  constructor(private router : Router) { 
    if(window.localStorage.getItem("auth"))
      this.router.navigate(['/home']);
      else this.ocultarLogin = false;
  }

  async login(){
    let context = this;

    this.errores = [false,false]

    let user =  await firebase.auth().signInWithEmailAndPassword(this.correo.trim(), this.password.trim())
    .catch(function(error) {
      if(['auth/invalid-email','auth/user-not-found'].includes(error.code)){
        context.errores[0] = true;
      }
      if(error.code === 'auth/wrong-password')
        context.errores[1] = true;
    }); 

    if(user){
      console.log(user);
      window.localStorage.setItem("auth","true");
      console.log('logueado');
      this.router.navigate(['/home']);
    }
    
  }


  

}
