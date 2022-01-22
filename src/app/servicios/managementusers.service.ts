import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../modelos/user.interface';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpHeaders } from '@angular/common/http';
import { UserChange } from '../modelos/userChange.interface';
import { Observable } from 'rxjs';
import { UserEditI } from '../modelos/userEdit.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementusersService {

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private apiUrl = '/api/usuarios/listado-nombres';
  private apiUrleditar = '/api/usuarios/editar';
  private apiUrlUser = '/api/usuarios/search/'

  constructor(
    private http: HttpClient
  ) { 
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

    create(dto: CreateUserDTO){
      return this.http.post<User>(this.apiUrl, dto);
    }

    getAll(){
      return this.http.get<User[]>(this.apiUrl, {headers: this.headers});
    }

    change(changes: UserChange){
      return this.http.put<UserChange>(this.apiUrleditar, changes)
    }

    editUserRol(id):Observable<UserEditI>{
      let direccion = this.apiUrlUser + id;
      return this.http.get<UserEditI>(direccion);
    }
}
