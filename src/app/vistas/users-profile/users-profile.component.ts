import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UsersService } from 'src/app/servicios/users.service';
import { UsuarioProfile } from 'src/app/modelos/userProfile.interface';
import { UpaModel } from 'src/app/modelos/userProfile.interface';
import { UpasService } from 'src/app/servicios/upas.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user:UsuarioProfile;
  upa: any = {};
  isEditing = false;


  constructor(private userService: UsersService, private upaService: UpasService) {}
 
 
 
ngOnInit(): void {

  const reloadPage = localStorage.getItem('reloadPage');
  if (!reloadPage) {
    localStorage.setItem('reloadPage', 'true');
    window.location.reload();
  } else {
    localStorage.removeItem('reloadPage');
  }


  const cacheBuster = new Date().getTime(); 

  this.userService.getUserbyId(cacheBuster).subscribe(
    (response) => {
      console.log(response);
      this.user = {
        name: response.userResponse.name,
        lastname: response.userResponse.lastname,
        email: response.userResponse.email,
        upa: response.userResponse.upa
      };
    },
    (error) => {
      console.log(error);
    },
  
  );

  this.upaService.getNameUpaById(cacheBuster).subscribe(
    (chats) => {
      this.upa = chats;
    },
    (error) => {
      console.log(error);
    }
    
  );
  
  
}
editUser(): void {
  this.isEditing = true;
}

saveUser(): void {
  this.userService.updateUser(this.user).subscribe(
    (response) => {
      console.log(response);
      this.isEditing = false;
    },
    (error) => {
      console.log(error);
    }
  );
}

cancelEdit(): void {
  this.isEditing = false;
}

}


