import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserEditI } from 'src/app/modelos/userEdit.interface';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-rol',
  templateUrl: './edit-user-rol.component.html',
  styleUrls: ['./edit-user-rol.component.css'],
})
export class EditUserRolComponent implements OnInit {
  constructor(private activerouter: ActivatedRoute, private router:Router, private managementusers:ManagementusersService) {}

  dataUser: UserEditI;

  editForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    rolid: new FormControl(''),
    fullName: new FormControl('')
  });

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let id = this.activerouter.snapshot.paramMap.get('id');
    this.managementusers.editUserRol(id).subscribe(data => {
      this.dataUser = data;
      this.editForm.setValue({
        'id': this.dataUser.id,
      })
    })
  }

}
