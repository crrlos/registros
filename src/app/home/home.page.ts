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
  ngAfterViewInit(){
    if(screen.width <= 768){
      document.getElementById('homeDiv').classList.remove('center');
    }
  }

  constructor(public toastController: ToastController) {
   
  }

  async guardar(){

    if(!this.registro['licores']){
        this.registro['licores'] = 0;
    }
    if(!this.registro['parqueadero']){
      this.registro['parqueadero'] = 0;
  }
  if(!this.registro['plataformaRecarga']){
    this.registro['plataformaRecarga'] = 0;
}

    let promise =  new Promise((resolve, reject)=>{
      db.collection("registros").where("fecha", "==", this.getDocumentKey())
    .limit(1)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        resolve({
          id : doc.id,
          empty : false
        });
      });

      resolve({
        empty : true
      });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    });

    let result : any = await promise;
    console.log(result);
    

    this.guardando = true;
    let  context = this;

    this.registro['fecha'] = this.getDocumentKey();


    if(result.empty){
      db.collection("registros")
      .add(this.registro)
      .then(function() {
      context.showConfirmation('Registros guardados.');
      context.guardando = false;
    })
    .catch(function(error) {
      context.showConfirmation('Se produjo un error. Intente de nuevo.');
      
    });
    }else{

      db.collection("registros")
      .doc(result.id)
      .set(this.registro)
      .then(function() {
      context.showConfirmation('Registros guardados.');
      context.guardando = false;
    })
    .catch(function(error) {
      context.showConfirmation('Se produjo un error. Intente de nuevo.');
      
    });

    }

    
    
  }

  

  getDocumentKey() : string{
    let fecha : any = this.fechaActual.split('T')[0];
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
