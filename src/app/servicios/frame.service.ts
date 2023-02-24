import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableFrame } from '../modelos/data-table-upa.interface';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  private apiUrl = '/api/frame/getAll'

  constructor(
    private http: HttpClient
  ) { }

  getFrame() {
    return this.http.get<TableFrame[]>(this.apiUrl);
  }
}
