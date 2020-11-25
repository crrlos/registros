import { Component } from '@angular/core';
declare const firebase : any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fechaActual = new Date().toISOString();

  constructor() {

  }

}
