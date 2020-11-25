import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { imagenConsultar, imagenRegistrar, imagenSalir } from 'src/environments/environment'

declare const firebase : any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  registrar = imagenRegistrar;
  consultar = imagenConsultar;
  salir = imagenSalir;

  admin = false;

  constructor(private router: Router) {
    this.admin = window.localStorage.getItem('uid') == window.localStorage.getItem('tkrs_')
   }

  ngOnInit() {

    
  }

  cerrarSesion(){
      window.localStorage.clear();
      firebase.auth().signOut();
      this.router.navigate(['/login'])
  }
  consultarIngresos(){
  
    this.router.navigate(['/consulta'])
}
registrarIngresos(){
  
  this.router.navigate(['/home'])
}

}
