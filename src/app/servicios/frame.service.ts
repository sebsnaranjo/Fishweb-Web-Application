import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableFrame } from '../modelos/data-table-upa.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  private apiUrl = '/api/frame/getAll'
  private getReportUrl = '/api/frame/getReport'
  private getGraphUrl = '/api/frame/getFrameVariablesDate'
  private getLastFrameUrl = '/api/frame/getLast'

  constructor(
    private http: HttpClient
  ) { }

  getFrame() {
    return this.http.get<TableFrame[]>(this.apiUrl);
  }

  getLastFrame(){
    return this.http.get(this.getLastFrameUrl);
  }

  getReport(datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.getReportUrl, datos, { headers: headers, responseType: 'arraybuffer' });
  }

  getGraph(datos: any): Observable<any> {
    return this.http.post(this.getGraphUrl, datos);
  }


}
