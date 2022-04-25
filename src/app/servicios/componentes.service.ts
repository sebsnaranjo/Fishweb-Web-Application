import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComponenteService{
    headers = new HttpHeaders().set("Authorization", "Bearer" + sessionStorage.getItem("acces_token"));
    private apiUrl = '/api/controler/crear';

    constructor(
        private http: HttpClient
    ){
        this.headers.append("Content-Type" , "application/json");
        this.headers.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token")); 
    }
    crearComponente(nombre:string,)
}