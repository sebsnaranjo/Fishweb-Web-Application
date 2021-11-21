import { Component, OnInit } from '@angular/core';
import { CreateUserDTO, User } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserChange } from 'src/app/modelos/userChange.interface';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  ELEMENT_DATA: User[];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fullName', 'button'];
  dataSource = new MatTableDataSource<User>();

  constructor( private managmentUser:ManagementusersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.change();
  }

  public getUsers() {
    let resp=this.managmentUser.getAll();
    resp.subscribe(report => this.dataSource.data=report as User[])
  }

  public change(): void {
    const updateUser: UserChange = {
      idUser: 4,
      rolUser: 3,
    };
    this.managmentUser.change(updateUser).subscribe((data)=>{
      console.log(data)
    })
  }
}