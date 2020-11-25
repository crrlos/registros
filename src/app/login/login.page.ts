import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
declare const firebase : any;
declare const db : any;
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
      this.router.navigate(['/principal']);
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
      window.localStorage.setItem("uid", user.user.uid);
      window.localStorage.setItem("auth","true");


      var docRef = db.collection("usuarios").doc("admin");

      let promesa = new Promise((resolve, reject) => {

        docRef.get().then(function(doc) {
          if (doc.exists) {
              resolve(doc.data().uid);
          } else {
              // doc.data() will be undefined in this case
              resolve(null);
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

      });

      let result : any = await promesa;
      
      if(result){
        window.localStorage.setItem("tkrs_",result);
      }
      
      
      this.router.navigate(['/principal']);
    }
    
  }


  

}
