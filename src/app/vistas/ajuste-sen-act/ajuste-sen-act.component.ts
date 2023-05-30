import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Sensor_1 } from 'src/app/modelos/settingsensor.interface';

import { FrameService } from 'src/app/servicios/frame.service';

@Component({
  selector: 'app-ajuste-sen-act',
  templateUrl: './ajuste-sen-act.component.html',
  styleUrls: ['./ajuste-sen-act.component.css'],
})
export class AjusteSenActComponent implements OnInit, OnDestroy {

  @ViewChild('sensorForm') sensorForm: NgForm;
  @ViewChild('actuadorForm') actuadorForm: NgForm;

  sensor1: Sensor_1;
/*   sensor2: Sensor; */
/*   actuador1: Actuador;
  actuador2: Actuador; */

  newJson: Sensor_1;
/*   serviceJson: JsonModel; */

  private ngUnsubscribe = new Subject<void>();; // Subject para notificar la finalización
  /* intervalTime: number = 5000; */

  constructor(private frameService: FrameService) {}

  ngOnInit(): void {
/*     this.frameService.getlastNewFrameByUpa(this.intervalTime)
      .pipe(takeUntil(this.ngUnsubscribe)) // Cancelar la suscripción al destruir el componente
      .subscribe((data: TableFrame) => {
      }); */
/*       this.frameService.getlastFrameByUpaNew().subscribe(jsonModel => {
        this.sensor1 = jsonModel.Sen.S_1;
        this.sensor2 = jsonModel.Sen.S_2;
        this.actuador1 = jsonModel.Act.A_1;
        this.actuador2 = jsonModel.Act.A_2;

        this.serviceJson = jsonModel;
      }); */
      this.frameService.getLastSetting("645993329aaf246f8ce032bd").subscribe(data => {
        console.log(data);
        this.sensor1 = data;
      })
  }
    
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(); // Notificar la finalización del componente
    this.ngUnsubscribe.complete();
    console.log('El componente se ha destruido.');
  }

/*   onSubmitSensor() {
    console.log(this.sensorForm.value); *
    this.newJson = new JsonModel();
    this.newJson.Sen = new Sen();
    this.newJson.idUPA = this.serviceJson.idUPA;
    this.newJson.T_Com = this.serviceJson.T_Com;
    this.newJson.D_Esc = this.serviceJson.D_Esc;
    this.newJson.Fn = this.serviceJson.Fn;
    this.newJson.D_Reg = this.serviceJson.D_Reg;

    this.newJson.Sen.PH = this.serviceJson.Sen.PH;
    this.newJson.Sen.Temp = this.serviceJson.Sen.Temp;
    this.newJson.Sen.C_Electrica = this.serviceJson.Sen.C_Electrica;
    this.newJson.Sen.N_Agua = this.serviceJson.Sen.N_Agua;
    this.newJson.Sen.Tu = this.serviceJson.Sen.Tu;
    this.newJson.Sen.O_Dis = this.serviceJson.Sen.O_Dis;
    this.newJson.Sen.S_1 = new Sensor();
    this.newJson.Sen.S_1.n = this.sensorForm.value.input0;
    this.newJson.Sen.S_1.v = this.serviceJson.Sen.S_1.v;
    this.newJson.Sen.S_1.e = this.sensorForm.value.status0;

    this.newJson.Act = new Act();
    this.newJson.Act.Alarmas = this.serviceJson.Act.Alarmas;
    this.newJson.Act.Recir = this.serviceJson.Act.Recir;
    this.newJson.Act.Alim = this.serviceJson.Act.Alim;
    this.newJson.Act.Ox = this.serviceJson.Act.Ox;

    console.log("New Json", this.newJson); 
    this.frameService.postFrame(this.newJson).subscribe(data => {
      console.log("POST", data);
      
    })
  } */

/*   onSubmitActuador() {
     console.log(this.actuadorForm.value); 
    this.newJson = new JsonModel();
    this.newJson.Sen = new Sen();
    this.newJson.idUPA = this.serviceJson.idUPA;
    this.newJson.T_Com = this.serviceJson.T_Com;
    this.newJson.D_Esc = this.serviceJson.D_Esc;
    this.newJson.Fn = this.serviceJson.Fn;
    this.newJson.D_Reg = this.serviceJson.D_Reg;

    this.newJson.Sen.PH = this.serviceJson.Sen.PH;
    this.newJson.Sen.Temp = this.serviceJson.Sen.Temp;
    this.newJson.Sen.C_Electrica = this.serviceJson.Sen.C_Electrica;
    this.newJson.Sen.N_Agua = this.serviceJson.Sen.N_Agua;
    this.newJson.Sen.Tu = this.serviceJson.Sen.Tu;
    this.newJson.Sen.O_Dis = this.serviceJson.Sen.O_Dis;
    this.newJson.Sen.S_1 = new Sensor();
    this.newJson.Sen.S_1.n = this.serviceJson.Sen.S_1.n;
    this.newJson.Sen.S_1.v = this.serviceJson.Sen.S_1.v;
    this.newJson.Sen.S_1.e = this.serviceJson.Sen.S_1.e;

    this.newJson.Act = new Act();
    this.newJson.Act.Alarmas = this.serviceJson.Act.Alarmas;
    this.newJson.Act.Recir = this.serviceJson.Act.Recir;
    this.newJson.Act.Alim = this.serviceJson.Act.Alim;
    this.newJson.Act.Ox = this.serviceJson.Act.Ox;

     console.log("New Json", this.newJson); 
    this.frameService.postFrame(this.newJson).subscribe(data => {
      console.log("POST", data);
      
    })
  } */

  onSubmitSensor() {
    this.newJson = new Sensor_1();
    this.newJson.idUPA = "645993329aaf246f8ce032bd";
    this.newJson.n = this.sensorForm.value.input0;
    this.newJson.e = this.sensorForm.value.status0;
    this.frameService.createSetting(this.newJson).subscribe(data => {
      console.log(data);
    })
  }
}
