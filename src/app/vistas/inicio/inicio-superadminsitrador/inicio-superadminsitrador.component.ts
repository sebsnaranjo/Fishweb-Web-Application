import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-superadminsitrador',
  templateUrl: './inicio-superadminsitrador.component.html',
  styleUrls: ['./inicio-superadminsitrador.component.css']
})
export class InicioSuperadminsitradorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redireccionar_controlar() {
    this.router.navigate(['/controlar'])
  }

  redireccionar_usuarios() {
    this.router.navigate(['/gestionar-usuarios'])
  }

}
