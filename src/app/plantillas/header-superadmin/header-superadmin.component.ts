import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-superadmin',
  templateUrl: './header-superadmin.component.html',
  styleUrls: ['./header-superadmin.component.css']
})
export class HeaderSuperadminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.rolId);
    sessionStorage.removeItem(environment.expiration);
    this.router.navigate(['inicio']);
  }

}
