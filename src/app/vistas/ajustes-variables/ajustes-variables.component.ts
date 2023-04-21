import { Component, OnInit } from '@angular/core';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { FrameService } from 'src/app/servicios/frame.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes-variables',
  templateUrl: './ajustes-variables.component.html',
  styleUrls: ['./ajustes-variables.component.css']
})
export class AjustesVariablesComponent implements OnInit {

  modoTransmision: number;
  rtuValue: number;
  rtuView: boolean = false; 

  lastFrame: TableFrame;
  valuePH: number;
  valueTemperatura: number;
  valueConductividad: number;
  valueNivelAgua: number;
  valueTurbidez: number;
  valueOxigenoDisuelto: number;

  typeComValue: number;

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

  saveValuePH() {
    /* console.log("Valor de la variable", this.valuePH)
    console.log("PH", this.lastFrame.Datos.PH) */
    this.lastFrame.Datos.PH = this.valuePH; // modificas el valor de PH en el objeto "Datos"
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor del PH ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueTemperatura() {
    console.log("Valor de la variable", this.valueTemperatura)
    this.lastFrame.Datos.Temperatura = this.valueTemperatura;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor de la Temperatura ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueConductividad() {
    console.log("Valor de la variable", this.valueConductividad)
    this.lastFrame.Datos.Conductividad_Electrica = this.valueConductividad;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor de la Conductividad ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueNivelAgua() {
    console.log("Valor de la variable", this.valueNivelAgua)
    this.lastFrame.Datos.Nivel_Agua = this.valueNivelAgua;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor del Nivel del Agua ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueTurbidez() {
    console.log("Valor de la variable", this.valueTurbidez)
    this.lastFrame.Datos.Turbidez = this.valueTurbidez;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor de la Turbidez ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueOxigenoDisuelto() {
    console.log("Valor de la variable", this.valueOxigenoDisuelto)
    this.lastFrame.Datos.Oxigeno_Disuelto = this.valueOxigenoDisuelto;
    delete this.lastFrame?._id;
    this.lastFrame.createdAt = new Date(Date.now());
    this.frameService.postFrame(this.lastFrame).subscribe((data) => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: '¡Valor del Oxigeno Disuelto ha sido enviado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

}
