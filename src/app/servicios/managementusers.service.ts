import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../modelos/user.interface';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpHeaders } from '@angular/common/http';
import { UserChange } from '../modelos/userChange.interface';
import { Observable } from 'rxjs';
import { UserEditI } from '../modelos/userEdit.interface';
import { EditRolI } from '../modelos/rolEdit.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementusersService {

  private apiUrl = '/api/usuarios/listado-nombres';
  private apiUrleditar = '/api/usuarios/editar';
  private apiUrlUser = 'api/auth/getUser/';
  private editRol = '/api/usuarios/editar';

  private getUsers = '/api/auth/getAll';

  constructor(private http: HttpClient) {}
    
    create(dto: CreateUserDTO){
      return this.http.post<User>(this.apiUrl, dto);
    }

    getAll(){
      return  this.http.get<User[]>(this.getUsers);
    }

    change(changes: UserChange){
      return this.http.put<UserChange>(this.apiUrleditar, changes)
    }

    editUserRol(id):Observable<any>{
      let direccion = this.apiUrlUser + id;
      return this.http.get<any>(direccion);
    }

    editIdRol(form:EditRolI):Observable<EditRolI>{
      let direccion = this.editRol;
      return this.http.put<EditRolI>(direccion, form)
    }

}
