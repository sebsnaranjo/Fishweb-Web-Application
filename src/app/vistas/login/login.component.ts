import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { LoginI } from 'src/app/modelos/login.interface';
import { Subscriber } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsersService } from 'src/app/servicios/users.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private AuthService: AuthService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  loginF = new FormGroup({
    email: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
  });

  async loggear(values) {
    this.AuthService.login(values.email, values.clave).subscribe( (data) => {
      sessionStorage.setItem(environment.TOKEN, data.data.token);
      this.AuthService.token(data.data.token, data.data.user.rolId);
      this.AuthService.getIdRol();
      let rol = this.AuthService.getIdRol();
      if(rol == 1){
        this.router.navigate(['/inicio-super-administrador'])
      } else if (rol == 2) {
        this.router.navigate(['/inicio-administrador'])
      } else if (rol == 3){
        this.router.navigate(['/inicio-auxiliar'])
      }
    })
  }
}
