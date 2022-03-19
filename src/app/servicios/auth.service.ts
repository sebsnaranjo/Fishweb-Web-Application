import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenDecodeI } from '../modelos/token.interface';
import jwt_decode from 'jwt-decode';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/Account/login';

  constructor(private http: HttpClient, private encrypt: EncryptService) {}

  login(email: string, clave: string): Observable<any> {
    return this.http.post<string>(this.apiUrl, { email, clave });
  }

  token(token: string, rol_id: number): void {
    const decode = jwt_decode<TokenDecodeI>(token);

    sessionStorage.setItem(environment.TOKEN, token);

    let expiration_encrypt = this.encrypt.encrypt(JSON.stringify(decode.exp));
    console.log(expiration_encrypt);
    sessionStorage.setItem(environment.expiration, expiration_encrypt);

    let rolId_encrypt = this.encrypt.encrypt(JSON.stringify(rol_id));
    console.log(rolId_encrypt);
    sessionStorage.setItem(environment.rolId, rolId_encrypt);
  }

  isLoggedIn(): boolean {
    const ssToken = sessionStorage.getItem(environment.TOKEN);
    if (!ssToken) {
      return false;
    } else {
      return true;
    }
  }
}
