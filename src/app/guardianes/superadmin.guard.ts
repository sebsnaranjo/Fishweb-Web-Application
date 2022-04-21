import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(){
    if (this.authService.HaveAccessSuperAdmin())
    return true;
    else {
      return false;
    }
  }
  
}
