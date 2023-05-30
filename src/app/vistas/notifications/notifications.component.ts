import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FrameService } from 'src/app/servicios/frame.service';
import { UpasService } from 'src/app/servicios/upas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

interface Range {
  name: string;
  mean: number;
  min: number;
  max: number;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  temperatura: number = 51;

  private interval: any;

  dataRange: Range[] = [];

  constructor(private frameService: FrameService, private emailService: UpasService, private authService:AuthService) { }

  ngOnInit(): void {
    const idRol = this.authService.getIdRol();

    this.frameService.getRangeSensor("645993329aaf246f8ce032bd").subscribe((data: Range[]) => {
      this.dataRange = data;
      if (this.dataRange && this.dataRange.length > 0) {
        console.log("RANGO", this.dataRange[0].min);
      }
    });

    if(idRol != 1){
      this.alert();
      this.interval = setInterval(() => {
        this.alert();
      }, 60000); // llamar a getData() cada 5 segundos
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); // limpia el intervalo cuando se destruye el componente
  }

  alert() {
    this.frameService.getlastFrameByUpa().subscribe((data: any) => {
      console.log(data);
  
      const condiciones = {
        PH: { min: this.dataRange[0].min, max: this.dataRange[0].max },
        Temp: { min: this.dataRange[1].min, max: this.dataRange[1].max },
        C_Electrica: { min: this.dataRange[2].min, max: this.dataRange[2].max },
        N_Agua: { min: this.dataRange[3].min, max: this.dataRange[3].max },
        Tu: { min: this.dataRange[4].min, max: this.dataRange[4].max },
        O_Dis: { min: this.dataRange[5].min, max: this.dataRange[5].max },
        S_1: { min: this.dataRange[6].min, max: this.dataRange[6].max }
      };
  
      const variableNombres = {
        PH: "PH",
        Temp: "Temperatura",
        C_Electrica: "Conductividad eléctrica",
        N_Agua: "Nivel de agua",
        Tu: "Turbidez",
        O_Dis: "Oxigeno",
        S_1: "Variable"
      };
  
      let warningText = "";
  
      for (let variable in condiciones) {
        const variableNombre = variableNombres[variable] || variable.replace(/_/g, " ");
        const valor = data.Sensores[variable];
        const condicion = condiciones[variable];
  
        if (valor < condicion.min || valor > condicion.max) {
          warningText += `${variableNombre}: ${valor}\n`;
        }
      }
  
      if (warningText !== "") {
        Swal.fire({
          icon: 'warning',
          title: 'Debes tener cuidado con las siguientes variables',
          text: warningText,
          showCancelButton: true,
          cancelButtonText: 'Cerrar',
          confirmButtonText: 'Enviar correo electrónico'
        }).then((result) => {
          if (result.isConfirmed) {
            const email = this.authService.getEmailUser();
            const message = 'Debes tener cuidado con las siguientes variables:\n' + warningText;
            this.emailService.sendWarningEmail({ email, message }).subscribe(() => {
              Swal.fire('Correo electrónico enviado', '', 'success');
            }, () => {
              Swal.fire('Error al enviar correo electrónico', '', 'error');
            });
          }
        });
      }
    });
  }
  
}
  


