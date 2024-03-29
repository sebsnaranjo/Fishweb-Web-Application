import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistreGuard implements CanActivate {
  
  HaveAccess(){
    var loggintoken = sessionStorage.getItem(environment.TOKEN)||'';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata= JSON.parse(_atobdata);
    if(_finaldata.rol.id_rol == 1 || 2){
      return true
    } 
    alert('No tienes permiso');
    return false
  }

  canActivate(){
    if (this.HaveAccess())
    return true;
    else {
      return false;
    }
  }
  
}
