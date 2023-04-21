import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UsersService } from 'src/app/servicios/users.service';
import { UsuarioProfile } from 'src/app/modelos/userProfile.interface';
import { UpaModel } from 'src/app/modelos/userProfile.interface';
import { UpasService } from 'src/app/servicios/upas.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user: UsuarioProfile;
  upa: any;


  constructor(private userService: UsersService, private upaService: UpasService) {}

ngOnInit(): void {
    
  this.userService.getUserbyId().subscribe(
    (response) => {
      this.user = response.userResponse;
    },
    (error) => {
      console.log(error);
    }
  );

  this.upaService.getNameUpaById().subscribe(
    (chats) => {
      this.upa = chats;
    },
    (error) => {
      console.log(error);
    }
  );
  

}}
