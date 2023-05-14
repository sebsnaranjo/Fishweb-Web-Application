import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';
import { UpasService } from 'src/app/servicios/upas.service';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UpaModel } from 'src/app/modelos/data-table-upa.interface';
import Swal from 'sweetalert2';
import { UpaModels } from 'src/app/modelos/upa.model';

@Component({
  selector: 'app-create-upa',
  templateUrl: './create-upa.component.html',
  styleUrls: ['./create-upa.component.css']
})
export class CreateUpaComponent {
  
registreUpaFormGroup: FormGroup;

createGroup(){
  return new FormGroup({
    name: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
  });
}

  constructor(private upaService: UpasService) {
    this.registreUpaFormGroup = this.createGroup();
    }

  
  registre(){
    if (this.registreUpaFormGroup.valid){
      var model = new UpaModels()
        model.name = this.registreUpaFormGroup.controls["name"].value;
        model.location = this.registreUpaFormGroup.controls["location"].value ;

        


        this.upaService.crearUpa(model).subscribe(
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

        } else {
          if (this.registreUpaFormGroup.controls["name"].value === ''){
            Swal.fire({
              title: 'Campo vacío',
              text: 'El campo nombre UPA no puede estar vacío',
              icon: 'warning'
            });


          }else if (this.registreUpaFormGroup.controls["location"].value === ''){
            Swal.fire({
              title: 'Campo vacío',
              text: 'El campo locación no puede estar vacío',
              icon: 'warning'
            });
            
          }
        }
    }
  
  }

 
  
  
  




