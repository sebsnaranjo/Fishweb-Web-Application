import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { LoginI } from 'src/app/modelos/login.interface';
import { Subscriber } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsersService } from 'src/app/servicios/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  
  constructor(
    private AuthService: AuthService,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  loginF = new FormGroup({
    email: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
  });

  async loggear(values) {
    this.AuthService.login(values.email, values.clave).subscribe(rta => {
      console.log(rta)
    })
  }

  /*createUser() {
    this.usersService.create({
      nombre: 'Sebas',
      apellido: 'Naranjo',
      email: 'fnarnao@ucun.com',
      clave: '12345',
    }).subscribe(rta => {
      console.log(rta)
    })
  }*/

  /*login() {
    this.AuthService.login('fnarnao@ucun.com','12345').subscribe(rta => {
      console.log(rta)
    })
  }*/

}
