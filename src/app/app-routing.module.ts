import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { LoginComponent } from './vistas/login/login.component';
import { NotfoundComponent } from './vistas/notfound/notfound.component';
import { RegisterComponent } from './vistas/register/register.component';
import { GestionarUsuariosComponent } from './vistas/gestionar-usuarios/gestionar-usuarios.component';
import { CreateUpaComponent } from './vistas/create-upa/create-upa.component';
import { RolregistreComponent } from './vistas/rol-registre/rolregistre/rolregistre.component';
import { EditUserRolComponent } from './vistas/edit-user-rol/edit-user-rol.component';
import { InicioAuxiliarComponent } from './vistas/inicio/inicio-auxiliar/inicio-auxiliar.component';
import { InicioAdministradorComponent } from './vistas/inicio/inicio-administrador/inicio-administrador.component';
import { InicioSuperadminsitradorComponent } from './vistas/inicio/inicio-superadminsitrador/inicio-superadminsitrador.component';
import { ControlarComponent } from './vistas/controlar/controlar.component';
import { MensajeComponent } from './vistas/mensaje/mensaje.component';
import { UsersPermissionComponent } from './vistas/users-permission/users-permission.component';
import { RoleGuard } from './guardianes/role.guard';
import { ReportsComponent } from './vistas/reports/reports.component';
import { UsersComponent } from './layaouts/users/users.component';
import { HomeViewComponent } from './layaouts/home-view/home-view.component';
import { AjustesVariablesComponent } from './vistas/ajustes-variables/ajustes-variables.component';
import { AdminGuard } from './guardianes/admin.guard';
import { SuperadminGuard } from './guardianes/superadmin.guard';
import { AuxGuard } from './guardianes/aux.guard';

const routes: Routes = [
  {
    path: '', component: HomeViewComponent, children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ]
  },
  {
    path: '', component: UsersComponent, children: [
      { path: 'registro', component: RolregistreComponent },
      { path: 'gestionar-usuarios', canActivate: [AdminGuard], component: GestionarUsuariosComponent },
      { path: 'crear-upa', component: CreateUpaComponent },
      { path: 'edit-rol/:id', component: EditUserRolComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio-auxiliar', component: InicioAuxiliarComponent },
      { path: 'inicio-administrador', component: InicioAdministradorComponent },
      { path: 'inicio-super-administrador', component: InicioSuperadminsitradorComponent },
      { path: 'controlar', component: ControlarComponent },
      { path: 'mensaje', component: MensajeComponent },
      { path: 'permiso-usuarios', component: UsersPermissionComponent },
      { path: 'ajuste-variables', component: AjustesVariablesComponent},
      { path: 'reportes', component: ReportsComponent},
    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, GestionarUsuariosComponent, CreateUpaComponent]