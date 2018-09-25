import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
    public router: Router ){

  }

  canActivate(){
    if(this._usuarioService.islogged()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
