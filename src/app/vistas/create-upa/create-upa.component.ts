import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';
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
    private router:Router,
    private AdminUser: RegistrorolService
  ) { }

  crearUpaF = new FormGroup({
    nameUpa: new FormControl('', Validators.required),
    descript: new FormControl('', Validators.required),
    numberAct: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    nameAdmin: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  async createUPA(values) {
    this.UpaService.crearUpa(values.nameUpa, values.descript, values.numberAct).subscribe( (data) => {
      console.log(data);
      //this.router.navigate(['inicio'])
    this.AdminUser.RegistroAdmin(values.id, values.nameAdmin, values.lastaname, values.email, values.password).subscribe((data)=> {
      console.log(data);
    })
    })
    //registro administrador
  }

}
