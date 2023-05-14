import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableFrame, UpaModel } from '../modelos/data-table-upa.interface';
import { UpaModels } from '../modelos/upa.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpasService {

  upaId : string = this.authService.getIdUpa();

  headers = new HttpHeaders().set("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  private apiUrl = '/api/upa/createUpa';
  private apiGet = '/api/upa/getupa'
  private upaUrl = '/api/upa/upaName'
  private getUsers = '/api/upa/userby';
  private getFrames = '/api/upa/frameby';
  private emailUrl = '/api/upa/enviarMail';
  private getUpaId = '/api/upa/'
  private emailUpa = '/api/upa/emailby'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  }

  crearUpa(create: UpaModels){
    const upaCreate = {
      name: create.name,
      location: create.location
    }
    return this.http.post<string>(this.apiUrl, {name: upaCreate.name, location: {name: upaCreate.location}});
  }

  getUPAs()  {
    return this.http.get<UpaModel[]>(this.apiGet)
  }
  
  getNameUpaById(cacheBuster: number){

    return this.http.get<any>(`${this.upaUrl}/${this.upaId}`);
    
  }
  
  //Obtiene los usuarios vinculados a una UPA
  getUsersUPA(id: string) {
    return this.http.get(`${this.getUsers}/${id}`);
  }

  //Obtiene los tramas(JSON) vinculados a una UPA
  getFrameUPA(id: string): Observable<TableFrame[]> {
    return this.http.get<TableFrame[]>(`${this.getFrames}/${id}`);
  }

  //Obtiene la UPA vinculada al id
  getUpaById(id: string){
    return this.http.get(`${this.getUpaId}/${id}`);
  }

  sendWarningEmail(emailData: {email: string, message: string}) {
    return this.http.post(this.emailUrl, emailData);
  }

  getEmailByUpa(){

    return this.http.get<any>(`${this.emailUpa}/${this.upaId}`);

  }

}
