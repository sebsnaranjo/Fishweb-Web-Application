import { Component, OnInit } from '@angular/core';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { FrameService } from 'src/app/servicios/frame.service';

@Component({
  selector: 'app-ajustes-variables',
  templateUrl: './ajustes-variables.component.html',
  styleUrls: ['./ajustes-variables.component.css']
})
export class AjustesVariablesComponent implements OnInit {

  lastFrame: TableFrame;
  valuePH: number;
  valueTemperatura: number;
  valueConductividad: number;
  valueNivelAgua: number;
  valueTurbidez: number;
  valueOxigenoDisuelto: number;

  constructor(private frameService: FrameService) { }

  ngOnInit(): void {
    this.getFrame();
  }

  getFrame() {
    this.frameService.getLastFrame().subscribe((data) => {
      console.log("DATAAAAAAAAAAA", data);
      this.lastFrame = data;
    })
  }

  saveValuePH() {
    console.log("Valor de la variable", this.valuePH)
    console.log("PH", this.lastFrame.Datos.PH)
    this.lastFrame.Datos.PH = this.valuePH; // modificas el valor de PH en el objeto "Datos"
    console.log("Nuevo frame", this.lastFrame)
  }

  saveValueTemperatura() {
    console.log("Valor de la variable", this.valueTemperatura)
    this.lastFrame.Datos.Temperatura = this.valueTemperatura;
  }

  saveValueConductividad() {
    console.log("Valor de la variable", this.valueConductividad)
    this.lastFrame.Datos.Conductividad_Electrica = this.valueConductividad;
  }

  saveValueNivelAgua() {
    console.log("Valor de la variable", this.valueNivelAgua)
    this.lastFrame.Datos.Nivel_Agua = this.valueNivelAgua;
  }

  saveValueTurbidez() {
    console.log("Valor de la variable", this.valueTurbidez)
    this.lastFrame.Datos.Turbidez = this.valueTurbidez;
  }

  saveValueOxigenoDisuelto() {
    console.log("Valor de la variable", this.valueOxigenoDisuelto)
    this.lastFrame.Datos.Oxigeno_Disuelto = this.valueOxigenoDisuelto;
  }

}
