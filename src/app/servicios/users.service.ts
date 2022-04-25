import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from '../modelos/user.interface';

//Ver funcionamiento del environments

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = '/api/Account/registro';

  constructor(
    private http: HttpClient
  ) { }

    create(dto: CreateUserDTO){
      return this.http.post<User>(this.apiUrl, dto);
    }

}
