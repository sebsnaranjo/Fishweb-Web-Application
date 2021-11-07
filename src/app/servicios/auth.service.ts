import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../modelos/auth.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/Account/login';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, clave: string) {
    return this.http.post<Auth>(this.apiUrl, {email, clave});
  }
}
