import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { LoginI } from 'src/app/modelos/login.interface';
import { Subscriber } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private AuthService: AuthService,
    private usersService: UsersService
  ) { }

  createUser() {
    this.usersService.create({
      nombre: 'Sebas',
      apellido: 'Naranjo',
      email: 'fnarnao@ucun.com',
      clave: '12345',
    }).subscribe(rta => {
      console.log(rta)
    })
  }

  login() {
    this.AuthService.login('fnarnao@ucun.com','12345').subscribe(rta => {
      console.log(rta)
    })
  }

}
