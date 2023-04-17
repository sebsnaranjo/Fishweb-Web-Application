import { Component, OnInit } from '@angular/core';
import { FrameService } from 'src/app/servicios/frame.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  
  temperatura: number = 51;

  private interval: any;

  constructor(private frameService: FrameService) { }

  ngOnInit(): void {
    this.alert();
    this.interval = setInterval(() => {
      this.alert();
    }, 60000); // llamar a getData() cada 5 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); // limpia el intervalo cuando se destruye el componente
  }

  alert(){
    this.frameService.getLastFrame().subscribe((data: any) => {
      console.log(data);

      const condiciones = {
        Temperatura: {min: -10, max: 40},
        Conductividad_Electrica: {min: 0, max: 2},
        Nivel_Agua: {min: 0, max: 100},
        Turbidez: {min: 0, max: 10},
        Oxigeno_Disuelto: {min: 0, max: 14},
      };
      
      let warningText = "";
      
      for(let variable in condiciones) {
        let variableNombre = variable.replace(/_/g, " ");
        if(data.Datos[variable] < condiciones[variable].min || data.Datos[variable] > condiciones[variable].max) {
          warningText += `${variableNombre}: ${data.Datos[variable]}\n`;
        }
      }
      
      if(warningText !== "") {
        Swal.fire({
          icon: 'warning',
          title: 'Debes tener cuidado con las siguientes variables',
          text: warningText,
        });
      }

    })
  }

}
