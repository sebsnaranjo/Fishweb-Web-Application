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
  dataSource = new MatTableDataSource<DataTableUpa>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  obtenerReportes(){
    this.router.navigate(['editRol']);
  }

}
