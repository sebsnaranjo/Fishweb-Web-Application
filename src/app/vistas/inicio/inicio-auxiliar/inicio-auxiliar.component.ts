import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-auxiliar',
  templateUrl: './inicio-auxiliar.component.html',
  styleUrls: ['./inicio-auxiliar.component.css']
})
export class InicioAuxiliarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redireccionar_controlar() {
    this.router.navigate(['/controlar'])
  }

  /* se tiene que redireccionar al chat */
  redireccionar_informar() {
    this.router.navigate(['/inicio-auxiliar'])
  }

}
