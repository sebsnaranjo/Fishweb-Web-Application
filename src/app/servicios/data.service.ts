import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableFrame } from '../modelos/data-table-upa.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { SensorData } from '../modelos/sensorData.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  upaId : string = this.authService.getIdUpa();

  private urlRange = environment.HOST + '/api/frame/getLastSensorRange'

  constructor(private http: HttpClient,
    private authService: AuthService){}

  getData(): Observable<SensorData[]>{
    return this.http.get<SensorData[]>(`${this.urlRange}/${this.upaId}`);
  }
 
}

