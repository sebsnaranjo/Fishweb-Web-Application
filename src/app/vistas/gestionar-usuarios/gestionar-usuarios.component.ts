import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserChange } from 'src/app/modelos/userChange.interface';
/* import { UrlSegment } from '@angular/router';
import { Output, EventEmitter } from '@angular/core'; */
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
/* import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; */

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css'],
})
export class GestionarUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: User[];
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'roles',
    'button',
  ];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private managmentUser: ManagementusersService,
    private router: Router
  ) /* private activerouter: ActivatedRoute */
  {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /*   dataUser: User;

  editForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    rolId: new FormControl(''),
  }); */

  ngOnInit(): void {
    /*     let id = this.activerouter.snapshot.paramMap.get('id'); */
    this.getUsers();
    /*     this.managmentUser.editUserRol(id).subscribe((data) => {
      this.dataUser = data[0];
      this.editForm.setValue({
        'nombre': this.dataUser.nombre,
        'apellido': this.dataUser.apellido,
        'email': this.dataUser.email,
        'rolId': this.dataUser.rolId
      });
      console.log(this.editForm.value);
    }); */
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  public getUsers() {
    this.managmentUser.getAll().subscribe((data) => {
      console.log(data);
    })
    let resp = this.managmentUser.getAll();
    resp.subscribe((report) => (this.dataSource.data = report as User[]));
  }

/*   public change(): void {
    const updateUser: UserChange = {
      idUser: 5,
      rolUser: 2,
    };
    this.managmentUser.change(updateUser).subscribe((data) => {
      console.log(data);
    });
  } */

  editUserRol(id) {
    this.router.navigate(['edit-rol', id]);
  }
}
