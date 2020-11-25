import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
declare const db : any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fechaActual = new Date().toISOString();
  guardando =  false;
  registro = {
    

  }

  constructor(public toastController: ToastController) {}

  guardar(){

    this.guardando = true;
    let  context = this;
    db.collection("registros")
      .doc(this.getDocumentKey())
      .set(this.registro)
    .then(function() {
      context.showConfirmation('Registros guardados.');
      context.guardando = false;
    })
    .catch(function(error) {
      context.showConfirmation('Se produjo un error. Intente de nuevo.');
      
    });
    
  }

  

  getDocumentKey() : string{
    let fecha : any = new Date().toISOString().split('T')[0];
    // returns YYYYMMDD
    return fecha.replaceAll('-','')
  }

  private async showConfirmation(mensaje : string){
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 2000
    });
    toast.present();
    
  }

}
