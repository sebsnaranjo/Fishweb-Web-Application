import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TokenDecodeI } from 'src/app/modelos/token.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private intervalId: any;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.startTokenExpirationCheck();
  }
  
  startTokenExpirationCheck(): void {
    const checkTokenExpiration = () => {
      const expires = this.authService.getExpires();
      console.log("EXPIRES", expires);
      const now = Date.now().valueOf() / 1000;
      if (expires < now) {
        this.stopTokenExpirationCheck(); // Detener el intervalo si el token ha expirado
        sessionStorage.removeItem(environment.TOKEN);
        sessionStorage.removeItem(environment.rolId);
        sessionStorage.removeItem(environment.expiration);
        this.router.navigate(['inicio']);
        sessionStorage.clear();
      } else {
        console.log("X");
      }
    };
  
    // Iniciar el intervalo y guardar la referencia
    this.intervalId = setInterval(checkTokenExpiration, 10000);
  }
  
  stopTokenExpirationCheck(): void {
    // Detener el intervalo si existe una referencia almacenada
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // Limpiar la referencia almacenada
    }
  }
}
