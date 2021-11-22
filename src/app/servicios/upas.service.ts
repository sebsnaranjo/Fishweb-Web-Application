import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpasService {

  private apiUrl = '/api/upas/crear';

  constructor(
    private http: HttpClient
  ) { }

  crearUpa(nombre: string, descripcion: string, cantidadactividades: number):Observable<any>{
    return this.http.post<string>(this.apiUrl, {nombre, descripcion, cantidadactividades});
  }
}
