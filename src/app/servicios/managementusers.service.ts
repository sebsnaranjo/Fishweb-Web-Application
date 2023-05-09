import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI, CreateUserDTO } from '../modelos/user.interface';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpHeaders } from '@angular/common/http';
import { UserChange } from '../modelos/userChange.interface';
import { Observable } from 'rxjs';
import { UserEditI } from '../modelos/userEdit.interface';
import { EditRolI } from '../modelos/rolEdit.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { id } from '@swimlane/ngx-charts/release/utils/id';

@Injectable({
  providedIn: 'root'
})
export class ManagementusersService {

  userId : string = this.authService.getIdUser();

  private apiUrl = environment.HOST + '/api/usuarios/listado-nombres';
  private apiUrleditar = environment.HOST + '/api/users/putUser'; //se usa
  private apiUrlUser = environment.HOST + 'api/auth/getUser/';
  private apiUrlUser2 = environment.HOST + 'api/auth/userAuth';
  

  private getUsers = '/api/users/getAll'; //se usa

  constructor(private http: HttpClient, private authService: AuthService) {}
    
    create(dto: CreateUserDTO){
      return this.http.post<UserI>(this.apiUrl, dto);
    }

    //Servicio para obtener todos los usuarios.
    getAll(){
      return  this.http.get<UserI[]>(this.getUsers);
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
    getUserLoggedIn() {
      const headers = {
        Authorization: 'Bearer ' + sessionStorage.getItem(environment.TOKEN)   // o donde sea que esté almacenado el token de autenticación
      };
      return this.http.get<any>(this.apiUrlUser2, { headers });
    }
    
}
