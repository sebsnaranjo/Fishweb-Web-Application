import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routingComponents } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './vistas/register/register.component'; 
import { LoginComponent } from './vistas/login/login.component';
import { HomeComponent } from './vistas/home/home.component';
import { NotfoundComponent } from './vistas/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { GestionarUsuariosComponent } from './vistas/gestionar-usuarios/gestionar-usuarios.component';
import { CreateUpaComponent } from './vistas/create-upa/create-upa.component';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatSelectModule } from '@angular/material/select';
import { RolregistreComponent } from './vistas/rol-registre/rolregistre/rolregistre.component';
import { EditUserRolComponent } from './vistas/edit-user-rol/edit-user-rol.component';
import { DataTableUpaComponent } from './vistas/data-table-upa/data-table-upa.component';
import { InicioAuxiliarComponent } from './vistas/inicio/inicio-auxiliar/inicio-auxiliar.component';
import { InicioAdministradorComponent } from './vistas/inicio/inicio-administrador/inicio-administrador.component';
import { InicioSuperadminsitradorComponent } from './vistas/inicio/inicio-superadminsitrador/inicio-superadminsitrador.component';
import { ControlarComponent } from './vistas/controlar/controlar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MensajeComponent } from './vistas/mensaje/mensaje.component';
import { UsersPermissionComponent } from './vistas/users-permission/users-permission.component';
import { InterceptorService } from './Interceptores/interceptor.service';
import { MessageBoxComponent } from './vistas/message-box/message-box.component';
import { NotifyComponent } from './vistas/notify/notify.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReportsComponent } from './vistas/reports/reports.component';
import { AjustesVariablesComponent } from './vistas/ajustes-variables/ajustes-variables.component';
import { HeaderUsersComponent } from './plantillas/header-users/header-users.component';
import { UsersComponent } from './layaouts/users/users.component';
import { HomeViewComponent } from './layaouts/home-view/home-view.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { GestionarUpasComponent } from './vistas/gestionar-upas/gestionar-upas.component';
import { InfoUpaComponent } from './vistas/info-upa/info-upa.component';
import { MatPaginatorModule}  from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';
import { UsersProfileComponent } from './vistas/users-profile/users-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotfoundComponent,
    GestionarUsuariosComponent,
    CreateUpaComponent,
    RolregistreComponent,
    EditUserRolComponent,
    DataTableUpaComponent,
    InicioAuxiliarComponent,
    InicioAdministradorComponent,
    InicioSuperadminsitradorComponent,
    ControlarComponent,
    MensajeComponent,
    UsersPermissionComponent,
    MessageBoxComponent,
    NotifyComponent,
    ReportsComponent,
    AjustesVariablesComponent,
    HeaderUsersComponent,
    UsersComponent,
    HomeViewComponent,
    GestionarUpasComponent,
    InfoUpaComponent,
    UsersProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    BrowserModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
