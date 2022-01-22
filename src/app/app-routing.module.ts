import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { LoginComponent } from './vistas/login/login.component';
import { NotfoundComponent } from './vistas/notfound/notfound.component';
import { RegisterComponent } from './vistas/register/register.component';
import { AuxiliarComponent } from './layaouts/auxiliar/auxiliar.component';
import { AdministradorGuard } from './administrador.guard';
import { GestionarUsuariosComponent } from './vistas/gestionar-usuarios/gestionar-usuarios.component';
import { CreateUpaComponent } from './vistas/create-upa/create-upa.component';
import { RolregistreComponent } from './vistas/rol-registre/rolregistre/rolregistre.component';
import { AdministradorComponent } from './layaouts/administrador/administrador.component';
import { SuperadministradorComponent } from './layaouts/superadministrador/superadministrador.component';
import { EditUserRolComponent } from './vistas/edit-user-rol/edit-user-rol.component';
import { InicioAuxiliarComponent } from './vistas/inicio/inicio-auxiliar/inicio-auxiliar.component';

const routes: Routes = [
  { path: '', component:AuxiliarComponent, children: [
    { path:'inicio', component:HomeComponent },
    { path:'login', component:LoginComponent },
    //{ path:'registro', component:RegisterComponent },
    //Ejemplo con gurdian
    //{ path:'registro', canActivate:[AdministradorGuard], component:RegisterComponent },
    { path:'', redirectTo:'inicio', pathMatch:'full' },
  ]},
  { path:'', component:SuperadministradorComponent, children: [
    { path: 'registro', component: RolregistreComponent},
    { path:'gestionarUsuarios', component:GestionarUsuariosComponent },
    { path: 'crearUPA', component:CreateUpaComponent },
    { path:'editRol/:id', component: EditUserRolComponent},
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path: 'inicioAuxiliar', component: InicioAuxiliarComponent}
  ]},
  { path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, GestionarUsuariosComponent, CreateUpaComponent]