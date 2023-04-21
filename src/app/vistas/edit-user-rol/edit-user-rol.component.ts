import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserEditI } from 'src/app/modelos/userEdit.interface';
import { EditRolI } from 'src/app/modelos/rolEdit.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserChange } from 'src/app/modelos/userChange.interface';

@Component({
  selector: 'app-edit-user-rol',
  templateUrl: './edit-user-rol.component.html',
  styleUrls: ['./edit-user-rol.component.css'],
})
export class EditUserRolComponent implements OnInit {
  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private managementusers: ManagementusersService
  ) {}

  dataUser: UserEditI;
  selectedValue: number;
  idUser: any;

  editForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    rol: new FormControl('')
  });

  ngOnInit(): void {
    let id = this.activerouter.snapshot.paramMap.get('id');
    this.idUser = id;
    this.managementusers.editUserRol(id).subscribe((data) => {
      this.dataUser = data;
      /* this.editar(this.dataUser); */
    });
  }

/*   editar(dataEdit: UserEditI) {
    this.editForm = new FormGroup({
      _id: new FormControl(dataEdit._id, Validators.required),
      name: new FormControl(dataEdit.name, Validators.required),
      lastname: new FormControl(dataEdit.lastname, Validators.required),
      email: new FormControl(dataEdit.email, Validators.required),
      rol: new FormControl(dataEdit.roles.id_rol, Validators.required),
    });
  } */

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
    this.router.navigate(['gestionar-usuarios']);
  }
}
