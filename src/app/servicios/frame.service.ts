import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableFrame } from '../modelos/data-table-upa.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  idUpaUser: string = this.authService.getIdUpa();

  private apiUrl = '/api/frame/getAll'
  private getReportUrl = '/api/frame/getReport'
  private getGraphUrl = '/api/frame/getFrameVariablesDate'
  private getLastFrameUrl = '/api/frame/getLast'
  private getLastFrameUpaUrl = '/api/frame/getLastFrameUpa'
  private getAllFrameUpaUrl = '/api/frame/getAllFrameUpa'
  private postFrameUrl = '/api/frame/createFrame'

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

  getAllFrameByUpa(): Observable<TableFrame[]> {
    return this.http.get<TableFrame[]>(`${this.getAllFrameUpaUrl}/${this.idUpaUser}`);
  }

  getReport(datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.getReportUrl, datos, { headers: headers, responseType: 'arraybuffer' });
  }

  getGraph(datos: any): Observable<any> {
    return this.http.post(this.getGraphUrl, datos);
  }

  postFrame(datos: any): Observable<any> {
    return this.http.post(this.postFrameUrl, datos);
  }

}
