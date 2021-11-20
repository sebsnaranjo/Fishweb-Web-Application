import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpasService } from 'src/app/servicios/upas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-upa',
  templateUrl: './create-upa.component.html',
  styleUrls: ['./create-upa.component.css']
})
export class CreateUpaComponent {

  constructor(
    private UpaService: UpasService,
    private router:Router
  ) { }

  crearUpaF = new FormGroup({
    nameUpa: new FormControl('', Validators.required),
    descript: new FormControl('', Validators.required),
    numberAct: new FormControl('', Validators.required),
    nameAdmin: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  async createUPA(values) {
    this.UpaService.crearUpa(values.nombre, values.descripcion, values.cantidadactividades).subscribe( (data) => {
      console.log(data);
      this.router.navigate(['inicio'])
    })
    //registro administrador
  }

}
