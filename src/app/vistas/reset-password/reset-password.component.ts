import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { UsersService } from 'src/app/servicios/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  message: string | null = null;
  form: FormGroup;

  


  constructor(private userService: UsersService,private route: ActivatedRoute, private fb: FormBuilder){
   this.form = this.fb.group({
    password: ['', Validators.required],
   });

  }
ngOnInit(){
  const token = this.route.snapshot.paramMap.get('token');
  this.userService.setToken(token!);
}
onSubmit(){
  const password = this.form.value.password;
  this.userService.resetPassword(password).subscribe(
    (data) => {
      this.message = data['msg'];

       Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
        });

    },
    (error) => {
      //this.message = error.message;

      Swal.fire({
        icon: 'warning',
        title: 'Contraseña no se actualizo',
      });
    }
  );
}
  
}



