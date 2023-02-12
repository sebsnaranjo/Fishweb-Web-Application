import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';
import { UpasService } from 'src/app/servicios/upas.service';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-upa',
  templateUrl: './create-upa.component.html',
  styleUrls: ['./create-upa.component.css']
})
export class CreateUpaComponent {

  alerts(){
    Swal.fire({
      title: 'Registro exitoso',
      text: 'El registro se hizo con exito',
      icon: 'success'
    });
  }

  registreFormGroup: FormGroup;

  createFormGroup(){
    return new FormGroup({
    rolid: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    clave: new FormControl('',[Validators.required, Validators.minLength(7)]),
  });
  }
  constructor(
    private UpaService: UpasService,
    private router:Router,
    private AdminUser: RegistrorolService,
    private RegistreService: RegistrorolService
  ) {   this.registreFormGroup = this.createFormGroup(); }

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
      this.alerts();
      //this.router.navigate(['inicio'])
    })
    //registro administrador
  }
  
  registre(){
    if (this.registreFormGroup.valid){
      var model = new UsuarioModel()
      model.roles = this.registreFormGroup.controls["rolid"].value;
      model.name = this.registreFormGroup.controls["nombre"].value;
      model.lastname = this.registreFormGroup.controls["apellido"].value;
      model.email = this.registreFormGroup.controls["email"].value;
      model.password = this.registreFormGroup.controls["clave"].value;
 
      this.RegistreService.RegisterRol(model).subscribe(
        data => { 
          this.alerts();  }, 
      err => { 
        } )
    }else{
       Swal.fire({
      title: 'Formulario Invalido',
      text: 'El registro no se pudo realizar',
      icon: 'error'
    });
    }
   }

}
