import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
declare const db : any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  fechaInicio;
  fechaFin;

  totalParqueadero = 0;
  totalLicores = 0;
  totalPlataformaRecarga = 0;

  datos: any = [];

  constructor(private router : Router, private nav : NavController) { 
    let date = new Date();
    this.fechaFin = date.toISOString();

    date.setDate(date.getDate() - 30);

    this.fechaInicio = date.toISOString();

    let res  = window.localStorage.getItem('uid') == window.localStorage.getItem('tkrs_');
    if(!res){
      this.router.navigate(['/home']);}
  }

  ngOnInit() {

    
  }
  ngAfterViewInit(){
    if(screen.width <= 768){
      document.getElementById('consultaDiv').classList.remove('center');
    }
  }

  consultar(){
let context = this;
db.collection("registros")
.where("fecha", ">=", this.getDocumentKey(this.fechaInicio))
.where("fecha", "<=", this.getDocumentKey(this.fechaFin))
    .get()
    .then(function(querySnapshot) {
      context.datos = []
        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            data.fecha = data.fecha.substring(6,8)+'/'+data.fecha.substring(4,6) + '/' + data.fecha.substring(0,4);
            context.datos.push(data);
        });

        

        context.totalParqueadero = 0;
        context.totalLicores = 0;
        context.totalPlataformaRecarga = 0;

        context.datos.forEach(d => {

          d.parqueadero  *= 1;
          d.licores  *= 1;
          d.plataformaRecarga  *= 1;

          context.totalParqueadero += d.parqueadero  ?? 0;
          context.totalLicores += d.licores  ?? 0;
          context.totalPlataformaRecarga += d.plataformaRecarga ?? 0;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  getDocumentKey(fecha : any) : string{
    fecha  = fecha.split('T')[0];
    // returns YYYYMMDD
    return fecha.replaceAll('-','')
  }

}
