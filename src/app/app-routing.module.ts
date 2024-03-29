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
import { MessageBoxComponent } from './vistas/message-box/message-box.component';
import { UsersPermissionComponent } from './vistas/users-permission/users-permission.component';
import { ReportsComponent } from './vistas/reports/reports.component';
import { UsersComponent } from './layaouts/users/users.component';
import { HomeViewComponent } from './layaouts/home-view/home-view.component';
import { AjustesVariablesComponent } from './vistas/ajustes-variables/ajustes-variables.component';
import { ManageUsersGuard } from './guardianes/manage-users.guard';
import { ControlGuard } from './guardianes/control.guard';
import { CreateUpaGuard } from './guardianes/create-upa.guard';
import { RegistreGuard } from './guardianes/registre.guard';
import { MessageGuard } from './guardianes/message.guard';
import { ReportsGuard } from './guardianes/reports.guard';
import { VariableSettingGuard } from './guardianes/variable-setting.guard';
import { InfoUpaComponent } from './vistas/info-upa/info-upa.component';
import { UsersProfileComponent } from './vistas/users-profile/users-profile.component';
import { ForgotPasswordComponent } from './vistas/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './vistas/reset-password/reset-password.component';
import { EditRolSaComponent } from './vistas/super-admin/edit-rol-sa/edit-rol-sa.component';
import { DataShowGraphsComponent } from './vistas/data-show-graphs/data-show-graphs.component';
import { AjusteSenActComponent } from './vistas/ajuste-sen-act/ajuste-sen-act.component';

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
      { path: 'inicio-auxiliar', component: InicioAuxiliarComponent },
      { path: 'inicio-administrador', component: InicioAdministradorComponent },
      { path: 'inicio-super-administrador', component: InicioSuperadminsitradorComponent },
      { path: 'registro', canActivate: [RegistreGuard], component: RolregistreComponent },
      { path: 'gestionar-usuarios', canActivate: [ManageUsersGuard], component: GestionarUsuariosComponent },
      { path: 'edit-rol/:id', canActivate: [ManageUsersGuard], component: EditUserRolComponent },
      { path: 'perfil', component: UsersProfileComponent},
      { path: 'olvido-clave', component: ForgotPasswordComponent},
      { path: 'restaurar-clave/:token', component: ResetPasswordComponent},
      { path: 'crear-upa', canActivate: [CreateUpaGuard], component: CreateUpaComponent },
      { path: 'informacion-upa/:id', canActivate: [CreateUpaGuard], component: InfoUpaComponent},
      { path: 'controlar', canActivate: [ControlGuard], component: ControlarComponent },
      { path: 'mensaje', canActivate: [MessageGuard], component: MensajeComponent },
      { path: 'mensajes', canActivate: [MessageGuard], component: MessageBoxComponent },
      { path: 'ajuste-variables', canActivate: [VariableSettingGuard], component: AjustesVariablesComponent},
      { path: 'reportes', canActivate: [ReportsGuard], component: ReportsComponent},
      { path: 'edit-rol-superadmin/:id', canActivate: [ManageUsersGuard], component: EditRolSaComponent },
      { path: 'ajustes', component: AjusteSenActComponent},
      /* { path: 'permiso-usuarios', component: UsersPermissionComponent }, */
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
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