import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { UpasService } from 'src/app/servicios/upas.service';

@Component({
  selector: 'app-gestionar-usuarios-sa',
  templateUrl: './gestionar-usuarios-sa.component.html',
  styleUrls: ['./gestionar-usuarios-sa.component.css']
})
export class GestionarUsuariosSaComponent implements OnInit, AfterViewInit{

  idUpa: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: UserI[];
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'roles',
    'button',
  ];
  dataSource = new MatTableDataSource<UserI>();

  constructor(
    private activerouter: ActivatedRoute,
    private managmentUser: ManagementusersService,
    private upasService: UpasService,
    private router: Router
  ) /* private activerouter: ActivatedRoute */
  {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.idUpa = this.activerouter.snapshot.paramMap.get('id');
    this.getUsers(this.idUpa);
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  public getUsers(id) {
    this.upasService.getUsersUPA(id).subscribe((data: any) => {
      const filteredData = data.filter(user => user.roles.name_rol !== 'Superadministrador');
      this.dataSource.data = filteredData;
    })
    let resp = this.upasService.getUsersUPA(id);
    /* resp.subscribe((report) => (this.dataSource.data = report as UserI[])); */
  }

  editUserRol(id) {
    this.router.navigate(['edit-rol-superadmin', id]);
  }
  
}
