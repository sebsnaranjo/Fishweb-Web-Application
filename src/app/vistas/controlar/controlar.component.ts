import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { FrameService } from 'src/app/servicios/frame.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-controlar',
  templateUrl: './controlar.component.html',
  styleUrls: ['./controlar.component.css']
})
export class ControlarComponent implements OnInit {

  modoTransmision: number;
  rtuValue: number;
  rtuView: boolean = false;
  typeComValue: number;

  idRol: number = this.authService.getIdRol();
  idUpa: string = this.authService.getIdUpa();
  idUpaParametrer: any;

  lastFrame: TableFrame;

  constructor(
    private frameService: FrameService,
    private authService: AuthService,
    private activerouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idUpaParametrer = this.activerouter.snapshot.paramMap.get('id');
    this.getFrame();
    if(this.idRol === 1){
      this.lastFrame.idUPA = this.idUpa;
    }
  }

  getFrame() {
    if(this.idRol == 1){
      this.frameService.getlastFrameByUpaAdmin(this.idUpaParametrer).subscribe((data) => {
        this.lastFrame = data;
        this.lastFrame.idUPA = this.idUpaParametrer;
      })
    } else {
      this.frameService.getlastFrameByUpa().subscribe((data) => {
        this.lastFrame = data;
      })
    }
  }

  onConnectionTypeChange() {
    console.log(this.modoTransmision)
    // lógica para guardar el valor del primer dropdown
    if (this.modoTransmision == 1) {
      console.log("ES IGUAL 1")
      this.rtuView = true;
      this.typeComValue = 1;
    } else {
      this.rtuView = false;
      this.typeComValue = 2;
    }
    this.lastFrame.T_Com = this.typeComValue;
  }

  activarAlarma() {
    Swal.fire({
      title: '¿Deseas activar este actuador?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó guardar los cambios
        this.lastFrame.Act.Alarmas = 1;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Activado!', '', 'success');
        });
      }
    });
  }

  desactivarAlarma() {
    Swal.fire({
      title: '¿Deseas desactivar la alarma?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó desactivar la alarma
        this.lastFrame.Act.Alarmas = 0;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Alarma desactivada!', '', 'success');
        });
      }
    });
    
  }

  activarRecirculacion(){
    Swal.fire({
      title: '¿Deseas activar la recirculación?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó activar la recirculación
        this.lastFrame.Act.Recir = 1;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Recirculación activada!', '', 'success');
        });
      }
    });    
  }

  desactivarRecirculacion(){
    Swal.fire({
      title: '¿Deseas desactivar la recirculación?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó desactivar la recirculación
        this.lastFrame.Act.Recir = 0;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Recirculación desactivada!', '', 'success');
        });
      }
    });    
  }

  activarAlimentacion(){
    Swal.fire({
      title: '¿Deseas activar la alimentación?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó activar la alimentación
        this.lastFrame.Act.Alim = 1;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Alimentación activada!', '', 'success');
        });
      }
    });    
  }

  desactivarAlimentacion(){
    Swal.fire({
      title: '¿Deseas desactivar la alimentación?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó desactivar la alimentación
        this.lastFrame.Act.Alim = 0;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Alimentación desactivada!', '', 'success');
        });
      }
    });    
  }

  activarOxigeno(){
    Swal.fire({
      title: '¿Deseas activar el oxígeno?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó activar el oxígeno
        this.lastFrame.Act.Ox = 1;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Oxígeno activado!', '', 'success');
        });
      }
    });    
  }

  desactivarOxigeno(){
    Swal.fire({
      title: '¿Deseas desactivar el oxígeno?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Leer más sobre isConfirmed, isDenied a continuación */
      if (result.isConfirmed) {
        // El usuario confirmó desactivar el oxígeno
        this.lastFrame.Act.Ox = 0;
        this.lastFrame.D_Reg = 1;
        delete this.lastFrame?._id;
        this.lastFrame.createdAt = new Date(Date.now());
        this.frameService.postFrame(this.lastFrame).subscribe((data) => {
          console.log("POST FRAME", data);
          Swal.fire('¡Oxígeno desactivado!', '', 'success');
        });
      }
    });    
  }

}
