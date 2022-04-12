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
import { InicioAdministradorComponent } from './vistas/inicio/inicio-administrador/inicio-administrador.component';
import { InicioSuperadminsitradorComponent } from './vistas/inicio/inicio-superadminsitrador/inicio-superadminsitrador.component';
import { ControlarComponent } from './vistas/controlar/controlar.component';
import { MensajeComponent } from './vistas/mensaje/mensaje.component';
import { UsersPermissionComponent } from './vistas/users-permission/users-permission.component';
import { MessageBoxComponent } from './vistas/message-box/message-box.component';
import { NotifyComponent } from './vistas/notify/notify.component';
import { RoleGuard } from './guardianes/role.guard';

const routes: Routes = [
  { path: '', component:AuxiliarComponent, children: [
    { path:'inicio', component:NotifyComponent },
    { path:'login', component:LoginComponent },
    //{ path:'registro', component:RegisterComponent },
    //Ejemplo con gurdian
    //{ path:'registro', canActivate:[AdministradorGuard], component:RegisterComponent },
    { path:'', redirectTo:'inicio', pathMatch:'full' },
  ]},
  { path:'superadmin', component:SuperadministradorComponent, children: [
    { path: 'registro', component: RolregistreComponent},
    { path:'gestionar-usuarios', canActivate:[RoleGuard], data: {
      role: 'Admin'
    }, component:GestionarUsuariosComponent },
    { path: 'crear-upa', component:CreateUpaComponent },
    { path:'edit-rol/:id', component: EditUserRolComponent},
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path: 'inicio-auxiliar', component: InicioAuxiliarComponent},
    { path: 'inicio-administrador', component: InicioAdministradorComponent},
    { path: 'inicio-super-administrador', component: InicioSuperadminsitradorComponent},
    { path: 'controlar', component: ControlarComponent},
    { path: 'mensaje', component: MensajeComponent},
    { path: 'permiso-usuarios', component: UsersPermissionComponent}
  ]},
  { path:'admin', component:AdministradorComponent, children: [
    { path: 'registro', component: RolregistreComponent},
    { path:'gestionarUsuarios', canActivate:[AdministradorGuard], component:GestionarUsuariosComponent },
    { path: 'crearUPA', component:CreateUpaComponent },
    { path:'editRol/:id', component: EditUserRolComponent},
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path: 'inicioAuxiliar', component: InicioAuxiliarComponent},
    { path: 'inicioAdministrador', component: InicioAdministradorComponent},
    { path: 'inicioSuperAdministrador', component: InicioSuperadminsitradorComponent},
    { path: 'controlar', component: ControlarComponent},
    { path: 'mensaje', component: MensajeComponent},
    { path: 'permisoUsuarios', component: UsersPermissionComponent}
  ]},
  { path:'auxiliar', component:SuperadministradorComponent, children: [
    { path: 'registro', component: RolregistreComponent},
    { path:'gestionarUsuarios', canActivate:[AdministradorGuard], component:GestionarUsuariosComponent },
    { path: 'crearUPA', component:CreateUpaComponent },
    { path:'editRol/:id', component: EditUserRolComponent},
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path: 'inicioAuxiliar', component: InicioAuxiliarComponent},
    { path: 'inicioAdministrador', component: InicioAdministradorComponent},
    { path: 'inicioSuperAdministrador', component: InicioSuperadminsitradorComponent},
    { path: 'controlar', component: ControlarComponent},
    { path: 'mensaje', component: MensajeComponent},
    { path: 'permisoUsuarios', component: UsersPermissionComponent}
  ]},
  { path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, GestionarUsuariosComponent, CreateUpaComponent]