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
    this.lastFrame.Act.Alarmas = 1;
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
    this.lastFrame.Act.Alarmas = 0;
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
    this.lastFrame.Act.Recir = 1;
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
    this.lastFrame.Act.Recir = 0;
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
    this.lastFrame.Act.Alim = 1;
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
    this.lastFrame.Act.Alim = 0;
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
    this.lastFrame.Act.Ox = 1;
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
    this.lastFrame.Act.Ox = 0;
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
