import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpaModel } from '../modelos/data-table-upa.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpasService {

  upaId : string = this.authService.getIdUpa();

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private apiUrl = '/api/upas/crear';
  private apiGet = '/api/upa/getupa'
  private upaUrl = '/api/upa/upaName'
  private getUsers = '/api/upa/userby';
  private getFrames = '/api/upa/frameby';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

  crearUpa(nombre: string, descripcion: string, cantidadactividades: number){
    return this.http.post<string>(this.apiUrl, {nombre, descripcion, cantidadactividades}, {headers: this.headers});
  }

  getUPAs()  {
    return this.http.get<UpaModel[]>(this.apiGet)
  }
  
  getNameUpaById(){

    return this.http.get<any>(`${this.upaUrl}/${this.upaId}`);
    
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
