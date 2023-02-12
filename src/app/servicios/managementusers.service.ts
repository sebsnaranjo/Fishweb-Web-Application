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
  private apiUrleditar = '/api/users/putUser'; //se usa
  private apiUrlUser = 'api/auth/getUser/';
  private editRol = '/api/usuarios/editar';

  private getUsers = '/api/users/getAll'; //se usa

  constructor(private http: HttpClient) {}
    
    create(dto: CreateUserDTO){
      return this.http.post<User>(this.apiUrl, dto);
    }

    //Servicio para obtener todos los usuarios.
    getAll(){
      return  this.http.get<User[]>(this.getUsers);
    }

    //Servicio para realizar el cambio de rol.
    change(id: number, rol_change: any){
      return this.http.put<UserChange>(`${this.apiUrleditar}/${id}`, rol_change);
    }

    //Servicio para obtener el usuario por ID, se usa para: Cambiar el rol.
    editUserRol(id):Observable<any>{
      let direccion = this.apiUrlUser + id;
      return this.http.get<any>(direccion);
    }
}
