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

 private ocultarLogin = false;

  constructor(private router : Router) { 
    if(window.localStorage.getItem("auth"))
      this.router.navigate(['/home']);
      else this.ocultarLogin = false;
  }

  async login(){

    let user =  await firebase.auth().signInWithEmailAndPassword(this.correo.trim(), this.password.trim())
    .catch(function(error) {
      console.log(error)
    }); 

    if(user){
      console.log(user);
      window.localStorage.setItem("auth","true");
      console.log('logueado');
      this.router.navigate(['/home']);
    }
    
  }


  

}
