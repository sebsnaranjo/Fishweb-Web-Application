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
  private url: string = environment.REGISTRO + '/api/usuarios/registroUsuarios';

  constructor(
    private http: HttpClient

  ) {
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

  RegisterRol(registre: UsuarioModel) {
   return this.http.post<string>(this.url , registre );
  }

  RegistroAdmin(id: number, nombre: string, apellido:string, email:string, password:string){
    return this.http.post<string>(this.url , {id,nombre,apellido,email,password}, {headers: this.headers} );
  }
}
