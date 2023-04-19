import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  ELEMENT_DATA: any[];
  displayedColumns: string[] = ['fecha', 'ph', 'temperatura', 'c_electrica', 'nivel_agua', 'turbidez', 'oxigeno_disuelto'];

  constructor(
    private activerouter: ActivatedRoute,
    private upasService: UpasService
  ) {}

  dataSource = new MatTableDataSource<any>();

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.idUpa = this.activerouter.snapshot.paramMap.get('id');
    this.getFramesUpa(this.idUpa);
  }

  getFramesUpa(idUpa: any) {
    this.upasService.getFrameUPA(idUpa).subscribe((data) => {
      this.upaUsers = data as any[];
      this.dataSource = new MatTableDataSource(this.upaUsers); // asignar los datos al dataSource
    });
  }
}
