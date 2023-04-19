import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpaModel } from '../modelos/data-table-upa.interface';

@Injectable({
  providedIn: 'root'
})
export class UpasService {

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private apiUrl = '/api/upas/crear';
  private apiGet = '/api/upa/getupa'
  private getUsers = '/api/upa/userby';
  private getFrames = '/api/upa/frameby';

  constructor(
    private http: HttpClient
  ) { 
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

  crearUpa(nombre: string, descripcion: string, cantidadactividades: number){
    return this.http.post<string>(this.apiUrl, {nombre, descripcion, cantidadactividades}, {headers: this.headers});
  }

  getUPAs()  {
    return this.http.get<UpaModel>(this.apiGet)
  }

  //Obtiene los usuarios vinculados a una UPA
  getUsersUPA(id: string) {
    return this.http.get(`${this.getUsers}/${id}`);
  }

  //Obtiene los tramas(JSON) vinculados a una UPA
  getFrameUPA(id: string) {
    return this.http.get(`${this.getFrames}/${id}`);
  }

}
