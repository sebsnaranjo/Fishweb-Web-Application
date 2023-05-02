import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserI, CreateUserDTO } from '../modelos/user.interface';
import { AuthService } from './auth.service';
import { UsuarioModel } from '../modelos/usuario.model';
import { Observable } from 'rxjs';
import { UsuarioProfile } from 'src/app/modelos/userProfile.interface';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

//Ver funcionamiento del environments

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userId : string = this.authService.getIdUser();
  private token: string | null = null;
  
  private apiUrl = '/api/Account/registro';
  private userUrl = '/api/users/getUser'
  private forgotUrl = '/api/users/forgetPassword'
  private resetPass = '/api/users/resetPass?token=${token}'

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
    forgotPassword(email: string){

      const body = {email: email};

      return this.http.post<any>(`${this.forgotUrl}`, body);

    }

    setToken(token:string){
      this.token = token;
    }

    resetPassword(password: string) {
      const url = `/api/users/resetPassword?token=${this.token}`;
      const body = { password };
      return this.http.post(url, body);
    } 
    

}
