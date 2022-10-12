import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlGuard implements CanActivate {

  HaveAccess(){
    var loggintoken = sessionStorage.getItem(environment.TOKEN)||'';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    console.log("Este es el atob",_atobdata);
    var _finaldata= JSON.parse(_atobdata);
    console.log("Este es el finalDATA",_finaldata);
    if(_finaldata.rol[0].id_rol == 1 || _finaldata.rol[0].id_rol == 2){
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
