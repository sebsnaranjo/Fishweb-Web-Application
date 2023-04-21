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
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'createdAt': return new Date(item.createdAt);
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sort({id: 'createdAt', start: 'desc', disableClear: true});
  }

  ngOnInit(): void {
    this.getFrames();
  }
  
  public getFrames() {
    this.frameService.getAllFrameByUpa().subscribe((data: TableFrame[]) => {
      console.log("GET FRAMES", data);
    })
    let resp = this.frameService.getAllFrameByUpa();
    resp.subscribe((report) => (this.dataSource.data = report as unknown as TableFrame[]));
  }

}
export interface Upa{
  fecha: string;
  hora: string;
  ph: number;
  temperatura: number;
  nivelAgua: number;
  temperaturaAmbiente: number
}

