import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate, CanLoad {

  canActivate(): Observable<boolean> | boolean{
    console.log('canActivate');
    return true;
  }
  
  canLoad(): Observable<boolean> | boolean{
    console.log('canload');
    return true;
  }
}
