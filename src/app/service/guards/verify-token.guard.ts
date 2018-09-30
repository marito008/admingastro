import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
    public router: Router) {

  }

  canActivate( ):Promise<boolean> | boolean {
    console.log('Verifica renove token');
    let token = this._usuarioService.token;

    let payload = JSON.parse(atob(token.split('.')[1]));

    let expired = this.expiredTorken(payload.ext);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenove(payload.ext);
  }

  verifyRenove(dateExp: number): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      let tokenExp = new Date( dateExp * 1000);
      let dateNow = new Date();

      dateNow.setTime(dateNow.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > dateNow.getTime()) {
        resolve(true)
      } else {
        this._usuarioService.renovarToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false)
          });
      }

      resolve(true);
    });


  }
  expiredTorken(dateExp: number){
    let now = new Date().getTime() / 1000;

    if (dateExp < now){
      return true;
    } else {
      return false;
    }
  }
}
