import { Component, OnInit } from '@angular/core';
import { CreateUserDTO, User } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserChange } from 'src/app/modelos/userChange.interface';
import { UrlSegment } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  ELEMENT_DATA: User[];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fullName', 'rolId', 'button'];
  dataSource = new MatTableDataSource<User>();




  constructor(private managmentUser: ManagementusersService) { }


  ngOnInit(): void {
    this.getUsers();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  public getUsers() {
    let resp = this.managmentUser.getAll();
    resp.subscribe(report => this.dataSource.data = report as User[])
  }

  public change(): void {
    const updateUser: UserChange = {
      idUser: 5,
      rolUser: 2,
    };
    this.managmentUser.change(updateUser).subscribe((data) => {
      console.log(data)
    })
  }
}