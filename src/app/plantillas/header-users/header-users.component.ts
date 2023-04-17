import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header-users',
  templateUrl: './header-users.component.html',
  styleUrls: ['./header-users.component.css']
})
export class HeaderUsersComponent implements OnInit {

  rol_user: number = this.authService.getIdRol();

  modal: boolean = true;

  public get currentUser() {
    return this.authService.currentUser;
  }

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {

    this.modal;
  
  }

  logout() {
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.rolId);
    sessionStorage.removeItem(environment.expiration);
    this.router.navigate(['inicio']);
    sessionStorage.clear();

    this.modal = false;
  }

}
