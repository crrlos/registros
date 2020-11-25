import { Component, OnInit } from '@angular/core';
declare const firebase : any;
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {

  error = false;
  enviado = false;

  constructor() { }

  ngOnInit() {
  }

  recuperar(correo : string){
    console.log(correo)
    let context = this;
    firebase.auth().sendPasswordResetEmail(
      correo)
      .then(function() {
       context.enviado = true;
       context.error = false;

      })
      .catch(function(e) {
       context.error = true;
       context.enviado = false;
      });
  }

}
