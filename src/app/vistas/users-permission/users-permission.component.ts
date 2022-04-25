import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modelos/user.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserChange } from 'src/app/modelos/userChange.interface';
/* import { UrlSegment } from '@angular/router';
import { Output, EventEmitter } from '@angular/core'; */
import { Router } from '@angular/router';
/* import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; */

@Component({
  selector: 'app-users-permission',
  templateUrl: './users-permission.component.html',
  styleUrls: ['./users-permission.component.css']
})
export class UsersPermissionComponent implements OnInit {

  ELEMENT_DATA: User[];
  displayedColumns: string[] = [
    'nombre',
    'button',
  ];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private managmentUser: ManagementusersService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
