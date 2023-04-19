import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UpasService } from 'src/app/servicios/upas.service';

@Component({
  selector: 'app-info-upa',
  templateUrl: './info-upa.component.html',
  styleUrls: ['./info-upa.component.css']
})
export class InfoUpaComponent implements OnInit, AfterViewInit {

  upaUsers: any[] = [];

  idUpa: any;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: any[];
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'rol', 'button'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private activerouter: ActivatedRoute,
    private upasService: UpasService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
/*     this.getUsers(); */
    this.idUpa = this.activerouter.snapshot.paramMap.get('id');
    this.getUsersUPA(this.idUpa);
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  getUsersUPA(idUpa: any) {
    this.upasService.getUsersUPA(idUpa)
      .subscribe((report) => {
        this.upaUsers = report as any[];
        this.dataSource = new MatTableDataSource(this.upaUsers); // asignar los datos al dataSource
      });
  }

  editUserRol(id) {
    this.router.navigate(['edit-rol', id]);
  }
}
