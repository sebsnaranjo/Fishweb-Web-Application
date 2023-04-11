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

  constructor(
    private http: HttpClient
  ) { }

  getFrame() {
    return this.http.get<TableFrame[]>(this.apiUrl);
  }

/*   getReport(fechaInicio: Date, fechaFin: Date, variables: string[]) {

    const params = {
      fechaInicio: "2023-02-23T05:00:00.000Z",
      fechaFin: "2023-02-24T05:00:00.000Z",
      variables: [
          "PH"
      ]
    };
    const options = {
      responseType: 'arraybuffer'
    };
    return this.http.post<any>(this.getReportUrl, params, { observe: 'response', responseType: 'arraybuffer' });
  } */

  
  getReport(datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.getReportUrl, datos, { headers: headers, responseType: 'arraybuffer' });

  }

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error', error);
    return Observable.throw(error.message || error);
  }
}
