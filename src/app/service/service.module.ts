import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard } from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
