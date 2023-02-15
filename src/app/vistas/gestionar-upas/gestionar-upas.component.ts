import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UpasService } from 'src/app/servicios/upas.service';
import { Upa } from '../data-table-upa/data-table-upa.component';

@Component({
  selector: 'app-gestionar-upas',
  templateUrl: './gestionar-upas.component.html',
  styleUrls: ['./gestionar-upas.component.css']
})
export class GestionarUpasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: Upa[];
  displayedColumns: string[] = [
    'nombre',
    'locacion',
    'button',
  ];
  dataSource = new MatTableDataSource<Upa>();
  constructor(
    private upasService: UpasService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

    public getUsers() {
    this.upasService.getUPAs().subscribe((data) => {
      console.log(data);
    })
    let resp = this.upasService.getUPAs();
    resp.subscribe((report) => (this.dataSource.data = report as unknown as Upa[]));
  }

  infoUpa(id) {
    this.router.navigate(['informacion-upa', id]);
  }

}
