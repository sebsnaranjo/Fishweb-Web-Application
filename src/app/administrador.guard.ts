import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdministradorGuard implements CanActivate, CanLoad {
  helper = new JwtHelperService();

  constructor(private authservie: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    const isLoggedIn = this.authservie.isLoggedIn();
    if(!isLoggedIn){
      this.router.navigate(['login'])
    }
    return this.authservie.isLoggedIn();
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('canload');
    return true;
  }
}
