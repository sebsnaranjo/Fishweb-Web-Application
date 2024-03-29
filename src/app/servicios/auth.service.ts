import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenDecodeI } from '../modelos/token.interface';
import jwt_decode from 'jwt-decode';
import { EncryptService } from './encrypt.service';
import { IAuth, ILogin, UserRolModel } from '../modelos/auth.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.HOST + '/api/auth/signin';
  public currentUser = null;

  constructor(private http: HttpClient, private encrypt: EncryptService, private injector:Injector, private router:Router) {
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

    let id_user_encrypt = this.encrypt.encrypt(JSON.stringify(decode.id));
    sessionStorage.setItem(environment.userId, id_user_encrypt);

    let upa_encrypt = this.encrypt.encrypt(JSON.stringify(decode.upa));
    sessionStorage.setItem(environment.upaId, upa_encrypt);

    let email_encrypt = this.encrypt.encrypt(JSON.stringify(decode.email));
    sessionStorage.setItem(environment.email, email_encrypt);
  }

  isLoggedIn(): boolean {
    const ssToken = sessionStorage.getItem(environment.TOKEN);
    if (!ssToken) {
      return false;
    } else {
      return true;
    }
  }

  expiresInToken() {
    const tokenPayload = jwt_decode<TokenDecodeI>(environment.TOKEN);
    const now = Date.now().valueOf() / 1000;

    if (tokenPayload.exp < now) {
      return true;
    } else {
      return false;
    }
  }

  getIdUpa(){
    let idupa = sessionStorage.getItem(environment.upaId)||'';
    let upa = this.encrypt.decrypt(idupa).replace(/"/g, '');
    return upa;
  }

  getIdRol(){
    let idrol = sessionStorage.getItem(environment.rolId)||'';
    let rol = this.encrypt.decrypt(idrol);
    return rol;
  }

  getIdUser(){
    let iduser = sessionStorage.getItem(environment.userId)||'';
    let user = this.encrypt.decrypt(iduser).replace(/"/g, '');
    return user;
  }

  getEmailUser(){
    let emailUser = sessionStorage.getItem(environment.email)||'';
    let email = this.encrypt.decrypt(emailUser).replace(/"/g, '');
    return email;
  }

  getExpires(){
    let expiresToken = sessionStorage.getItem(environment.expiration)||'';
    let expires = this.encrypt.decrypt(expiresToken).replace(/"/g, '');
    return expires;
  }
 

}
