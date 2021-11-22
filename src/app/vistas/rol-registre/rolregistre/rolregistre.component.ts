import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { RegistrorolService } from 'src/app/servicios/registrorol.service';


@Component({
  selector: 'app-rolregistre',
  templateUrl: './rolregistre.component.html',
  styleUrls: ['./rolregistre.component.css']
})
export class RolregistreComponent implements OnInit {


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
  

  constructor(private fb: FormBuilder, private RegistreService: RegistrorolService) {
    this.registreFormGroup = this.createFormGroup();
   }

  ngOnInit(): void {
  }
registre(){
   if (this.registreFormGroup.valid){
     var model = new UsuarioModel()
     model.rolid = this.registreFormGroup.controls["rolid"].value;
     model.nombre = this.registreFormGroup.controls["nombre"].value;
     model.apellido = this.registreFormGroup.controls["apellido"].value;
     model.email = this.registreFormGroup.controls["email"].value;
     model.clave = this.registreFormGroup.controls["clave"].value;

     this.RegistreService.RegisterRol(model).subscribe(
       data => { 
         alert ("WELL DONE");}, 
     err => { 
       alert ("ERROR");} )
   }else{
      alert ("INVALIDO");
   }
  }
}
