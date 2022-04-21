import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    /*     route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot */
  ) {
    if (this.authService.HaveAccessSuperAdmin())
      return true;
    else {
      return false
    }
  }/* :
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const autorizacion = this.authService.user.role.includes(route.data.role);

    if (!autorizacion) {
      window.alert('No estas autorizado');
    }

    return true;
  } */
}
