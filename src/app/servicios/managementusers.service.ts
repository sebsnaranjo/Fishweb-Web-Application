import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../modelos/user.interface';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementusersService {

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private apiUrl = '/api/usuarios/listado-nombres';

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
}