import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { UpasService } from 'src/app/servicios/upas.service';

@Component({
  selector: 'app-frame-upa',
  templateUrl: './frame-upa.component.html',
  styleUrls: ['./frame-upa.component.css'],
})
export class FrameUpaComponent implements OnInit, AfterViewInit {
  upaUsers: any[] = [];

  idUpa: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA: TableFrame[];
  displayedColumns: string[] = ['createdAt', 'ph', 'temperatura', 'conductividad_electrica', 'nivelAgua', 'turbidez'];
  dataSource = new MatTableDataSource<TableFrame>();

  constructor(
    private activerouter: ActivatedRoute,
    private upasService: UpasService
  ) {}

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
    this.idUpa = this.activerouter.snapshot.paramMap.get('id');
    this.getFrames(this.idUpa);
  }

  public getFrames(idUpa: any) {
    this.upasService.getFrameUPA(idUpa).subscribe((data: TableFrame[]) => {
      console.log("GET FRAMES", data);
    })
    let resp = this.upasService.getFrameUPA(idUpa);
    resp.subscribe((report) => (this.dataSource.data = report as unknown as TableFrame[]));
  }
}
