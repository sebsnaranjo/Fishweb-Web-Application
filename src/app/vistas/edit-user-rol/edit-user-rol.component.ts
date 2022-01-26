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

  editForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    rolId: new FormControl(''),
    fullName: new FormControl(''),
  });

  ngOnInit(): void {
    let id = this.activerouter.snapshot.paramMap.get('id');
    this.managementusers.editUserRol(id).subscribe((data) => {
      this.dataUser = data.data;
      this.editar(this.dataUser);
    });
  }

  editar(dataEdit: UserEditI) {
    this.editForm = new FormGroup({
      id: new FormControl(dataEdit.id, Validators.required),
      nombre: new FormControl(dataEdit.nombre, Validators.required),
      apellido: new FormControl(dataEdit.apellido, Validators.required),
      email: new FormControl(dataEdit.email, Validators.required),
      rolId: new FormControl(dataEdit.rolId, Validators.required),
      fullName: new FormControl(dataEdit.fullName, Validators.required),
    });
  }

  putRol(form: UserEditI) {
    const updateUser: UserChange = {
      idUser: this.dataUser.id,
      rolUser: this.selectedValue,
    };

    console.log(updateUser);

    this.managementusers.change(updateUser).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['gestionarUsuarios']);
  }
}
