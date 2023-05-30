import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { catchError,map, switchMap } from 'rxjs/operators';
import { TableFrame } from '../modelos/data-table-upa.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  idUpaUser: string = this.authService.getIdUpa();

  private apiUrl = environment.HOST + '/api/frame/getAll'
  private getReportUrl = environment.HOST + '/api/frame/getReport'
  private getReportUrl2 = environment.HOST + '/api/frame/getDataReport'
  private getGraphUrl = environment.HOST + '/api/frame/getFrameVariablesDate'
  private getLastFrameUrl = environment.HOST + '/api/frame/getLast'
  private getLastFrameUpaUrl = environment.HOST + '/api/frame/getLastFrameUpa'
  private getAllFrameUpaUrl = environment.HOST + '/api/frame/getAllFrameUpa'
  private postFrameUrl = environment.HOST + '/api/frame/createFrame'
  private postNewFrameUrl = environment.HOST + '/api/frame/createNewFrame'
  private getLastSettingUrl = environment.HOST + '/api/frame/getSensorSettings'
  private postSettingUrl = environment.HOST + '/api/frame/createSensorData'
  private getRangeSensorUrl = environment.HOST + '/api/frame/getLastSensorRange'
  private postRangeSensorUrl = environment.HOST + '/api/frame/createRange'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getFrame() {
    return this.http.get<TableFrame[]>(this.apiUrl);
  }

  getLastFrame(): Observable<TableFrame> {
    return this.http.get<TableFrame>(this.getLastFrameUrl);
  }

  getlastFrameByUpa(): Observable<TableFrame> {
    return this.http.get<TableFrame>(`${this.getLastFrameUpaUrl}/${this.idUpaUser}`);
  }

/*   getlastFrameByUpaNew(): Observable<JsonModel> {
    return this.http.get<JsonModel>(`${this.getLastFrameUpaUrl}/${this.idUpaUser}`);
  } */

  getlastFrameByUpaAdmin(id: string): Observable<TableFrame> {
    return this.http.get<TableFrame>(`${this.getLastFrameUpaUrl}/${id}`);
  }

  getAllFrameByUpa(): Observable<TableFrame[]> {
    return this.http.get<TableFrame[]>(`${this.getAllFrameUpaUrl}/${this.idUpaUser}`);
  }

  getAllFrameByUpaURL(idUpa: string): Observable<TableFrame[]> {
    return this.http.get<TableFrame[]>(`${this.getAllFrameUpaUrl}/${idUpa}`);
  }

  getReport(datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.getReportUrl, datos, { headers: headers, responseType: 'arraybuffer' });
  }

  getDataReport(datos: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/frame/getDataReport", datos);
  }

  getGraph(datos: any): Observable<any> {
    return this.http.post(this.getGraphUrl, datos);
  }

  postFrame(datos: any): Observable<any> {
    return this.http.post(this.postNewFrameUrl, datos);
  }

  getlastNewFrameByUpa(intervalTime: number): Observable<TableFrame> {
    return interval(intervalTime).pipe(
      switchMap(() => this.http.get<TableFrame>(`${this.getLastFrameUpaUrl}/${this.idUpaUser}`))
    );
  }

  getLastSetting(idUpa: string): Observable<any>{
    return this.http.get(`${this.getLastSettingUrl}/${idUpa}`);
  }

  createSetting(datos: any): Observable<any>{
    return this.http.post(this.postSettingUrl, datos);
  }

  getRangeSensor(idUpa: any): Observable<any>{
    return this.http.get(`https://shielded-everglades-04466.herokuapp.com/api/frame/getLastSensorRange/${idUpa}`);
  }

  postRangeSensor(datos: any): Observable<any> {
    return this.http.post(this.postRangeSensorUrl, datos);
  }

}
