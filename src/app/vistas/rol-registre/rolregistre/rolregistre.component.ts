import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';
import { UpaModel } from 'src/app/modelos/data-table-upa.interface';
import { UpasService } from 'src/app/servicios/upas.service';
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
    upaId: new FormControl('', [Validators.required]),
  });
  }
  upas: UpaModel[] = [];
  selectedUpa: UpaModel;
  isDropdownOpen = false;

  constructor(private fb: FormBuilder, private RegistreService: RegistrorolService, private UpaService: UpasService,) {
    this.registreFormGroup = this.createFormGroup();
   }

  ngOnInit(): void {
  }
registre(){
  
   
   if (this.registreFormGroup.valid){
     var model = new UsuarioModel()
     model.roles = parseInt(this.registreFormGroup.controls["roles"].value);
     model.name = this.registreFormGroup.controls["name"].value;
     model.lastname = this.registreFormGroup.controls["lastname"].value;
     model.email = this.registreFormGroup.controls["email"].value;
     model.password = this.registreFormGroup.controls["password"].value;
     model.upaId = this.registreFormGroup.controls["upaId"].value;

    

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
    if (this.registreFormGroup.controls['roles'].invalid) {
      Swal.fire({
        title: 'Formulario Invalido',
        text: 'El campo roles es requerido',
        icon: 'error'
    });
  } else if (this.registreFormGroup.controls['name'].invalid) {
    Swal.fire({
      title: 'Formulario Invalido',
      text: 'El campo nombre es requerido',
      icon: 'error'
    });
  } else if (this.registreFormGroup.controls['lastname'].invalid) {
    Swal.fire({
      title: 'Formulario Invalido',
      text: 'El campo apellido es requerido',
      icon: 'error'
    });
  } else if (this.registreFormGroup.controls['email'].invalid) {
    Swal.fire({
      title: 'Formulario Invalido',
      text: 'El campo email es requerido y debe ser un correo válido',
      icon: 'error'
    });
  } else if (this.registreFormGroup.controls['password'].invalid) {
    Swal.fire({
      title: 'Formulario Invalido',
      text: 'El campo password es requerido y debe tener al menos 7 caracteres',
      icon: 'error'
    });
  
  } else {
    Swal.fire({
      title: 'Formulario Invalido',
      
      icon: 'error'
    });
   }
  }}
  toggleDropdown() {
    if (!this.isDropdownOpen) {
      this.UpaService.getUPAs().subscribe(upas => {
        this.upas = upas;
        this.isDropdownOpen = true;
      });
    } else {
      this.isDropdownOpen = false;
    }
  }
  
  selectUpa(upa: UpaModel) {
    this.registreFormGroup.controls["upaId"].setValue(upa._id);
    this.selectedUpa = upa;
    this.isDropdownOpen = false;
  }
  
  

}



