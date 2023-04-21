import { Component, OnInit } from '@angular/core';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
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

  lastFrame: TableFrame;

  constructor(private frameService: FrameService) { }

  ngOnInit(): void {
    this.getFrame();
  }

  getFrame() {
    this.frameService.getlastFrameByUpa().subscribe((data) => {
      this.lastFrame = data;
    })
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
    this.lastFrame.Type_Com = this.typeComValue;
  }

  activarAlarma() {
    this.lastFrame.Actuadores.Alarmas = 1;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Alarma activada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  desactivarAlarma() {
    this.lastFrame.Actuadores.Alarmas = 0;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Alarma desactivada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  activarRecirculacion(){
    this.lastFrame.Actuadores.Recirculacion = 1;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Recirculacion activada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  desactivarRecirculacion(){
    this.lastFrame.Actuadores.Recirculacion = 0;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Recirculacion desactivada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  activarAlimentacion(){
    this.lastFrame.Actuadores.Alimentacion = 1;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Alimentacion activada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  desactivarAlimentacion(){
    this.lastFrame.Actuadores.Alimentacion = 0;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Alimentacion desactivada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  activarOxigeno(){
    this.lastFrame.Actuadores.Oxigeno = 1;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Oxigeno activada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  desactivarOxigeno(){
    this.lastFrame.Actuadores.Oxigeno = 0;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log("POST FRAME", data)
      Swal.fire({
        icon: 'success',
        title: '¡Oxigeno desactivada!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

}
