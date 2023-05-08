import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserChange } from 'src/app/modelos/userChange.interface';
import { UserEditI } from 'src/app/modelos/userEdit.interface';
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

  dataUser: UserEditI;
  selectedValue: number;
  idUser: any;
  idUpa: any;

  editForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    rol: new FormControl('')
  });

  ngOnInit(): void {
    console.log("INICIO EL COMPONENTE");
    let id = this.activerouter.snapshot.paramMap.get('id');
    this.idUser = id;
    this.managementusers.editUserRol(id).subscribe((data) => {
      this.dataUser = data;
      /* this.editar(this.dataUser); */
    });
  }

  putRol(form: any) {
    const updateUser: UserChange = {
      idUser: this.dataUser._id,
      _id: this.selectedValue,
    };
    
    const roles = {
      roles: {
        _id: this.selectedValue
      }
    }

    this.managementusers.change(updateUser.idUser, roles).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['crear-upa']);
  }

}
