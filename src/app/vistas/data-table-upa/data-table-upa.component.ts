import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableUpa, TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FrameService } from 'src/app/servicios/frame.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data-table-upa',
  templateUrl: './data-table-upa.component.html',
  styleUrls: ['./data-table-upa.component.css']
})
export class DataTableUpaComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA: TableFrame[];
  displayedColumns: string[] = ['createdAt', 'ph', 'temperatura', 'conductividad_electrica', 'nivelAgua', 'turbidez'];
  /* dataSource = UPA_DATA; */
  dataSource = new MatTableDataSource<TableFrame>();
  //dataSource = new MatTableDataSource<DataTableUpa>();
  
  constructor(
    private frameService: FrameService,
    private router:Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getFrames();
    this.dataSource.sort = this.sort;
  }

 // filtrar(event: Event) {
   // const filtro = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filtro.trim().toLowerCase();
  //}

  obtenerReportes(){
    /* this.router.navigate(['editRol']); */
  }
  

  public getFrames() {
    this.frameService.getFrame().subscribe((data: TableFrame[]) => {
      console.log(data);
    })
    let resp = this.frameService.getFrame();
    resp.subscribe((report) => (this.dataSource.data = report as unknown as TableFrame[]));
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
