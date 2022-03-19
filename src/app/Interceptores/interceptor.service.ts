import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.token;

    if(!token) {
      return next.handle(req);
    }

    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })

    return next.handle(reqClone);

  }
  
}
