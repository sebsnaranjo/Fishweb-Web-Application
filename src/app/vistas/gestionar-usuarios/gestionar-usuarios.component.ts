import { Component, OnInit } from '@angular/core';
import { CreateUserDTO, User } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  ELEMENT_DATA: User[];
  displayedColumns: string[] = ['nombre', 'apellido', 'fullName'];
  dataSource = new MatTableDataSource<User>();

  constructor( private managmentUser:ManagementusersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    let resp=this.managmentUser.getAll();
    resp.subscribe(report => this.dataSource.data=report as User[])
  }
}