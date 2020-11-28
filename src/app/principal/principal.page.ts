import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { imagenConsultar, imagenRegistrar, imagenSalir } from 'src/environments/environment'
import { AuthService } from '../auth.service';

declare const firebase: any;
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

  constructor(private router: Router, private authService: AuthService) {

    if(window.localStorage.getItem('uid') && window.localStorage.getItem('tkrs_')){
      this.admin = window.localStorage.getItem('uid') == window.localStorage.getItem('tkrs_')
    }

  
    
  }

  ngOnInit() {
  

  }

  cerrarSesion() {

    window.localStorage.clear()

    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.authService.setAuthenticated(false);
          this.router.navigate(['/login'])
      })

  }
  consultarIngresos() {

    this.router.navigate(['/consulta'])
  }
  registrarIngresos() {

    this.router.navigate(['/home'])
  }

}
