import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserChange } from 'src/app/modelos/userChange.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';

@Component({
  selector: 'app-edit-rol-sa',
  templateUrl: './edit-rol-sa.component.html',
  styleUrls: ['./edit-rol-sa.component.css']
})
export class EditRolSaComponent implements OnInit{
  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private managementusers: ManagementusersService,
  ) {}

  dataUser: any;
  selectedValue: number;
  idUser: any;
  idUpa: any;

  idUserUrl: any;

  editForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    rol: new FormControl('')
  });

  ngOnInit(): void {
    console.log("INICIO EL COMPONENTE");
    this.idUserUrl = this.activerouter.snapshot.paramMap.get('id');
    this.idUser = this.idUserUrl;
    this.managementusers.editUserRol(this.idUserUrl).subscribe((data) => {
      this.dataUser = data.userResponse;
      console.log(this.dataUser);
    });
  }

  putRol(form: any) {
    const updateUser: UserChange = {
      idUser: this.idUserUrl,
      _id: this.selectedValue,
    };
    
    const roles = {
      roles: {
        _id: this.selectedValue
      }
    }

    this.managementusers.change(updateUser.idUser, roles).subscribe((data) => {
      console.log("RESPUESTA UPDATE USER", data);
    });

    this.router.navigate(['crear-upa']);
  }

}
