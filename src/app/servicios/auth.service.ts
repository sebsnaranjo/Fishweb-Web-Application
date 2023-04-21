import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenDecodeI } from '../modelos/token.interface';
import jwt_decode from 'jwt-decode';
import { EncryptService } from './encrypt.service';
import { IAuth, ILogin, UserRolModel } from '../modelos/auth.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth/signin';
  public currentUser = null;

  constructor(private http: HttpClient, private encrypt: EncryptService, private injector:Injector) {
    this.currentUser = this.getIdRol();
  }

  login(email: string, password: string): Observable<IAuth> {
    return this.http.post<IAuth>(this.apiUrl, { email, password })
  }

  token(token: string): void {
    const decode = jwt_decode<TokenDecodeI>(token);
    
    let expiration_encrypt = this.encrypt.encrypt(JSON.stringify(decode.exp));
    sessionStorage.setItem(environment.expiration, expiration_encrypt);

    let rol_encrypt = this.encrypt.encrypt(JSON.stringify(decode.rol.id_rol));
    sessionStorage.setItem(environment.rolId, rol_encrypt);

    let upa_encrypt = this.encrypt.encrypt(JSON.stringify(decode.upa));
    sessionStorage.setItem(environment.upaId, upa_encrypt);
  }

  isLoggedIn(): boolean {
    const ssToken = sessionStorage.getItem(environment.TOKEN);
    if (!ssToken) {
      return false;
    } else {
      return true;
    }
  }

  getIdRol(){
    let idrol = sessionStorage.getItem(environment.rolId)||'';
    let rol = this.encrypt.decrypt(idrol);
    return rol;
  }

  getIdUpa(){
    let idupa = sessionStorage.getItem(environment.upaId)||'';
    let upa = this.encrypt.decrypt(idupa).replace(/"/g, '');
    return upa;
  }

}
