import { Component, OnInit } from '@angular/core';
import { DataTableUpa } from 'src/app/modelos/data-table-upa.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table-upa',
  templateUrl: './data-table-upa.component.html',
  styleUrls: ['./data-table-upa.component.css']
})
export class DataTableUpaComponent implements OnInit {

  ELEMENT_DATA: DataTableUpa[];
  displayedColumns: string[] = ['fecha', 'hora', 'ph', 'temperatura', 'nivelAgua', 'temperaturaAmbiente'];
  dataSource = UPA_DATA;
  //dataSource = new MatTableDataSource<DataTableUpa>();
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

 // filtrar(event: Event) {
   // const filtro = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filtro.trim().toLowerCase();
  //}

  obtenerReportes(){
    /* this.router.navigate(['editRol']); */
  }

}
export interface Upa{
    fecha: string;
    hora: string;
    ph: number;
    temperatura: number;
    nivelAgua: number;
    temperaturaAmbiente: number;

}
const UPA_DATA: Upa[] = [
  {fecha: '2 de Abril 2022', hora: '5:35 A.M', ph: 6, temperatura: 15.0 , nivelAgua: 9,temperaturaAmbiente: 13.5},
  {fecha: '2 de Abril 2022', hora: '6:45 A.M', ph: 7, temperatura: 16.0 , nivelAgua: 10,temperaturaAmbiente: 18.3},
  {fecha: '2 de Abril 2022', hora: '10:35 A.M', ph: 6, temperatura: 15.0 , nivelAgua: 9,temperaturaAmbiente: 20.5}
]
