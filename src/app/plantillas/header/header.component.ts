import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.expiresInToken();
    setInterval(() => {
      this.authService.expiresInToken();
    }, 120000);
  }
  

  logout() {
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.rolId);
    sessionStorage.removeItem(environment.expiration);
    this.router.navigate(['inicio']);
  }

}
