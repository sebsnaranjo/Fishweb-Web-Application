import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenDecodeI } from '../modelos/token.interface';
import jwt_decode from 'jwt-decode';
import { EncryptService } from './encrypt.service';
import { UserRolModel } from '../modelos/auth.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/Account/login';
/*   user!: UserRolModel;

  get getToken(): any {
    return sessionStorage.getItem(environment.TOKEN)||'';
  }  */

  constructor(private http: HttpClient, private encrypt: EncryptService, private injector:Injector) {
/*      this.user = this.getUserRol(this.getToken) */
  }

  login(email: string, clave: string): Observable<any> {
    return this.http.post<string>(this.apiUrl, { email, clave })/* . pipe(
      tap((response: any) => {
        this.user = this.getUserRol(response.token);
      })
    ); */
  }

  token(token: string, rol_id: number): void {
    const decode = jwt_decode<TokenDecodeI>(token);

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

  HaveAccess(){
    var loggintoken = sessionStorage.getItem(environment.TOKEN)||'';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata= JSON.parse(_atobdata);
    console.log(_finaldata)
    if(_finaldata.role=='Super Administrador'){
      return true
    } 
    alert('No tienes permiso');
    return false
  }

/*   private getUserRol(token: string): UserRolModel {
    return JSON.parse(atob(token.split('.')[1])) as UserRolModel;
  } */
}
