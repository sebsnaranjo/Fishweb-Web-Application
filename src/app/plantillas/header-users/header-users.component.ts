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

  public get currentUser() {
    return this.authService.currentUser;
  }

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.rolId);
    sessionStorage.removeItem(environment.expiration);
    this.router.navigate(['inicio']);
  }

}
