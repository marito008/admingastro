import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class SidebarService {
  menu: any[] = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Graficas', url: '/graficas' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //       { titulo: 'Hospitales', url: '/hospitales' }
  //     ]
  //   }
  // ];
  constructor(
    public _usuaruiService: UsuarioService
  ) { }
  
  cargarMenu(){
    this.menu = this._usuaruiService.menu;
   }
}
