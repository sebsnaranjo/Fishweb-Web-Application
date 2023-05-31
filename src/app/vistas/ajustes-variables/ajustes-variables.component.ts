import { Component, OnInit } from '@angular/core';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { Sensor_1 } from 'src/app/modelos/settingsensor.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { FrameService } from 'src/app/servicios/frame.service';
import Swal from 'sweetalert2';

interface Range {
  name: string;
  min: number;
  max: number;
}

interface ResultObject {
  idUPA: string;
  [key: string]: any;
}

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
  valuePHmin: number;
  valuePHmax: number;
  valueTemperaturamin: number;
  valueTemperaturamax: number;
  valueConductividadmin: number;
  valueConductividadmax: number;
  valueNivelAguamin: number;
  valueNivelAguamax: number;
  valueTurbidezmin: number;
  valueTurbidezmax: number;
  valueOxigenoDisueltomin: number;
  valueOxigenoDisueltomax: number;
  valueS_1min: number;
  valueS_1max: number;

  typeComValue: number;

  sensor1: Sensor_1;
  nameSensor: string;
  stateSensor: boolean = false;
  dataRange: Range[];
  newDataRange: any;

  idUpa: string = this.authService.getIdUpa();

  constructor(private frameService: FrameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getFrame();

    this.frameService.getLastSetting(this.idUpa).subscribe(data => {
      console.log(data);
      this.sensor1 = data;
      this.nameSensor = this.sensor1.n;
      if(this.sensor1.e == 1){
        this.stateSensor = true;
      } else if (this.sensor1.e == 0){
        this.stateSensor = false;
      }
    })

    this.frameService.getRangeSensor(this.idUpa).subscribe( data => {
      this.dataRange = data;
      console.log("RANGOS", data);
    })
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
    this.lastFrame.T_Com = this.typeComValue;
  }

  saveValuePH() {
    if(!this.valuePHmin || !this.valuePHmax || this.valuePHmin > this.valuePHmax || this.valuePHmax < this.valuePHmin || this.valuePHmin < 0 || this.valuePHmax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'PH') {
        range.min = this.valuePHmin;
        range.max = this.valuePHmax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango del PH ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueTemperatura() {
    if(!this.valueTemperaturamin || !this.valueTemperaturamax || this.valueTemperaturamin > this.valueTemperaturamax || this.valueTemperaturamax < this.valueTemperaturamin || this.valueTemperaturamin < 0 || this.valueTemperaturamax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'Temp') {
        range.min = this.valueTemperaturamin;
        range.max = this.valueTemperaturamax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de Temperatura ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueConductividad() {
    if(!this.valueConductividadmin || !this.valueConductividadmax || this.valueConductividadmin > this.valueConductividadmax || this.valueConductividadmax < this.valueConductividadmin || this.valueConductividadmin < 0 || this.valueConductividadmax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'C_Electrica') {
        range.min = this.valueConductividadmin;
        range.max = this.valueConductividadmax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de Conductividad Electrica ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueNivelAgua() {
    if(!this.valueNivelAguamin || !this.valueNivelAguamax || this.valueNivelAguamin > this.valueNivelAguamax || this.valueNivelAguamax < this.valueNivelAguamin || this.valueNivelAguamin < 0 || this.valueNivelAguamax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'N_Agua') {
        range.min = this.valueNivelAguamin;
        range.max = this.valueNivelAguamax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de Nivel Agua ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueTurbidez() {
    if(!this.valueTurbidezmin || !this.valueTurbidezmax || this.valueTurbidezmin > this.valueTurbidezmax || this.valueTurbidezmax < this.valueTurbidezmin || this.valueTurbidezmin < 0 || this.valueTurbidezmax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'Tu') {
        range.min = this.valueTurbidezmin;
        range.max = this.valueTurbidezmax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de Trubidez ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueOxigenoDisuelto() {
    if(!this.valueOxigenoDisueltomin || !this.valueOxigenoDisueltomax || this.valueOxigenoDisueltomin > this.valueOxigenoDisueltomax || this.valueOxigenoDisueltomax < this.valueOxigenoDisueltomin || this.valueOxigenoDisueltomin < 0 || this.valueOxigenoDisueltomax < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'O_Dis') {
        range.min = this.valueOxigenoDisueltomin;
        range.max = this.valueOxigenoDisueltomax;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de Oxigeno Disuelto ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  saveValueS_1(){
    if(!this.valueS_1min || !this.valueS_1max || this.valueS_1min > this.valueS_1max || this.valueS_1max < this.valueS_1min || this.valueS_1min < 0 || this.valueS_1max < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Haz ingresado valores incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }
    this.dataRange = (this.dataRange as any[]).map(range => {
      if (range.name === 'S_1') {
        range.min = this.valueS_1min;
        range.max = this.valueS_1max;
      }
      return range;
    });

    let idUPA = this.idUpa; // tu idUPA

    let transformedObject: ResultObject = {
        idUPA: idUPA
    };

    this.dataRange.forEach((range: Range) => {
        transformedObject[range.name] = {
            n: range.min,
            m: range.max
        };
    });

    this.frameService.postRangeSensor(transformedObject).subscribe(data => {
      console.log("SE PUBLICO", data);
      Swal.fire({
        icon: 'success',
        title: '¡Rango de ' + this.nameSensor + ' ha sido actualizado!',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

}
