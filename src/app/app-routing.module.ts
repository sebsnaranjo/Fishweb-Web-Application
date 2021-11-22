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

const routes: Routes = [
  { path: '', component:AuxiliarComponent, children: [
    { path:'inicio', component:HomeComponent },
    { path:'login', component:LoginComponent },
    { path:'registro', component:RegisterComponent },
    { path:'gestionarUsuarios', component:GestionarUsuariosComponent },
    { path: 'crearupa', component:CreateUpaComponent },
    { path: 'registrorol', component: RolregistreComponent},
    //Ejemplo con gurdian
    //{ path:'registro', canActivate:[AdministradorGuard], component:RegisterComponent },
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path:'**', component:NotfoundComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, GestionarUsuariosComponent]