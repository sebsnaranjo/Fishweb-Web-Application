import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  email: string;
  submitted = false;
  error = '';
constructor(private userService: UsersService){}

ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  onSubmit(){
    this.submitted = true;
    this.userService.forgotPassword(this.email)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          this.error = error.message;
        }
      );
  }



}
