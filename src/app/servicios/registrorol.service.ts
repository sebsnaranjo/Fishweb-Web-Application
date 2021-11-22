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

  iddb(){
    const id =[
      { id: 1},
      {id:2}
    ];
    return {id};
  }
  private url: string = environment.REGISTRO + '/api/usuarios/registroUsuarios';

  constructor(
    private http: HttpClient

  ) {

  }
  RegisterRol(registre: UsuarioModel) {
   return this.http.post<string>(this.url , registre );
  }
}
