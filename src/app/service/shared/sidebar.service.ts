import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class SidebarService {
  menu: any[] = [];
  
  constructor(
    public _usuaruiService: UsuarioService
  ) { }
  
  cargarMenu(){
    this.menu = this._usuaruiService.menu;
   }
}
