import { Component } from '@angular/core';
import { DataService} from 'src/app/servicios/data.service';
import axios from 'axios';
import { SensorData } from 'src/app/modelos/sensorData.interface';

@Component({
  selector: 'app-data-show-graphs',
  templateUrl: './data-show-graphs.component.html',
  styleUrls: ['./data-show-graphs.component.css'],
  //providers: [Service],
})
export class DataShowGraphsComponent {

  phSensor: any; // Datos del sensor PH
  tempSensor: any; // Datos del sensor de temperatura
  c_elecSensor: any;
  nAguaSensor: any;
  tuSensor: any;
  oDisSensor: any;
  s1Sensor: any;
  // Agrega variables para los otros sensores

  constructor(private sensorService: DataService) { }

  ngOnInit(): void {
    this.sensorService.getData().subscribe(data => {
      // Asigna los datos del servicio a las variables correspondientes
      this.phSensor = data.find(sensor => sensor.name === 'PH');
      this.tempSensor = data.find(sensor => sensor.name === 'Temp');
      this.c_elecSensor = data.find(sensor => sensor.name === 'C_Electrica');
      this.nAguaSensor = data.find(sensor => sensor.name === 'N_Agua');
      this.tuSensor = data.find(sensor => sensor.name === 'Tu');
      this.oDisSensor = data.find(sensor => sensor.name === 'O_Dis');
      this.s1Sensor = data.find(sensor => sensor.name === 'S_1');
      // Asigna los valores para los otros sensores

    });
 
  }
  customizeText(arg) {
    return `${arg.valueText} °C`;
  }

}


