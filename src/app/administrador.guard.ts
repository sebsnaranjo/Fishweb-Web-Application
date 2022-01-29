import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate, CanLoad {

  constructor(private authservie: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return true;
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('canload');
    return true;
  }
}
