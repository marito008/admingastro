import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, 
        SharedService, 
        SidebarService, 
        UsuarioService, 
        HospitalesService,
        ObraSocialService,
        AdminGuard,
        LoginGuardGuard, 
        UploadFileService, 
        MedicoService,
//        EstudiosService,
        VerifyTokenGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { PacientesService } from './pacientes/pacientes.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalesService,
    PacientesService,
    ObraSocialService,
    MedicoService,
    AdminGuard,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    VerifyTokenGuard
//    EstudiosService
  ],
  declarations: []
})
export class ServiceModule { }
