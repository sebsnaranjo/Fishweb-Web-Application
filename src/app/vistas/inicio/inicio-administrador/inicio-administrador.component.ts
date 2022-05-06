import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-administrador',
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redireccionar_controlar() {
    this.router.navigate(['/controlar'])
  }

  redireccionar_ajustar() {
    this.router.navigate(['/ajuste-variables'])
  }

}
