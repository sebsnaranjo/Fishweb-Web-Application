import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../modelos/auth.interface'
import { Observable } from 'rxjs';
import { User } from '../modelos/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/Account/login';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, clave: string):Observable<any>{
    return this.http.post<string>(this.apiUrl, {email, clave});
  }

}
