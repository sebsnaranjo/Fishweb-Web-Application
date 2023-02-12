import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { RegisterComponent } from '../vistas/register/register.component';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrorolService {

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private url: string = environment.REGISTRO + '/api/auth/registre';

  constructor(
    private http: HttpClient

  ) {
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

  RegisterRol(registre: UsuarioModel) {
    const userWithRole = {
      roles: [registre.roles],
      name: registre.name,
      lastname: registre.lastname,
      email: registre.email,
      password: registre.password
     
    }
   return this.http.post<string>(this.url , userWithRole );
  }

 
}
