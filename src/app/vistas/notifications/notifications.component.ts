import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FrameService } from 'src/app/servicios/frame.service';
import { UpasService } from 'src/app/servicios/upas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  temperatura: number = 51;

  private interval: any;

  constructor(private frameService: FrameService, private emailService: UpasService, private authService:AuthService) { }

  ngOnInit(): void {
    const idRol = this.authService.getIdRol();
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
        PH: { min: 10, max: 13 },
        Temp: { min: 14, max: 15 },
        C_Electrica: { min: 0, max: 2 },
        N_Agua: { min: 0, max: 100 },
        Tu: { min: 0, max: 10 },
        O_Dis: { min: 0, max: 14 },
      };

      let warningText = "";

      for (let variable in condiciones) {
        let variableNombre = variable.replace(/_/g, " ");
        if (data.Sensores[variable] < condiciones[variable].min || data.Sensores[variable] > condiciones[variable].max) {
          warningText += `${variableNombre}: ${data.Sensores[variable]}\n`;
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
            this.emailService.sendWarningEmail({email, message}).subscribe(() => {
              Swal.fire('Correo electrónico enviado', '', 'success');
            }, () => {
              Swal.fire('Error al enviar correo electrónico', '', 'error');
            });
          }
        });
      }
    })

  }
}
  


