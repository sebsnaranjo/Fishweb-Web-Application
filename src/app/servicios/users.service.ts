import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserI, CreateUserDTO } from '../modelos/user.interface';
import { AuthService } from './auth.service';
import { UsuarioModel } from '../modelos/usuario.model';
import { Observable } from 'rxjs';
import { UsuarioProfile } from 'src/app/modelos/userProfile.interface';

//Ver funcionamiento del environments

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userId : string = this.authService.getIdUser2();

  private apiUrl = '/api/Account/registro';
  private userUrl = '/api/users/getUser'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

    create(dto: CreateUserDTO){
      return this.http.post<UserI>(this.apiUrl, dto);
    }
    getUserbyId(){
    
      return this.http.get<any>(`${this.userUrl}/${this.userId}`);
    
    }

}
