import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rolregistre',
  templateUrl: './rolregistre.component.html',
  styleUrls: ['./rolregistre.component.css']
})
export class RolregistreComponent implements OnInit {


  registreFormGroup: FormGroup;

  createFormGroup(){
    return new FormGroup({
    roles: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(7)]),
  });
  }
  

  constructor(private fb: FormBuilder, private RegistreService: RegistrorolService) {
    this.registreFormGroup = this.createFormGroup();
   }

  ngOnInit(): void {
  }
registre(){
   if (this.registreFormGroup.valid){
     var model = new UsuarioModel()
     model.roles = this.registreFormGroup.controls["roles"].value;
     model.name = this.registreFormGroup.controls["name"].value;
     model.lastname = this.registreFormGroup.controls["lastname"].value;
     model.email = this.registreFormGroup.controls["email"].value;
     model.password = this.registreFormGroup.controls["password"].value;

     this.RegistreService.RegisterRol(model).subscribe(
       data => { 
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El registro se hizo con exito',
          icon: 'success'
        });
        }, 
     err => { 
      Swal.fire({
        title: 'Registro fallo',
        text: 'El registro no se pudo realizar',
        icon: 'error'
      });} )
   }else{
    Swal.fire({
      title: 'Formulario Invalido',
      text: 'El registro no se pudo realizar',
      icon: 'error'
    });
   }
  }
}
