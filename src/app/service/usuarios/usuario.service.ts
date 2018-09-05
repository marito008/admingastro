import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
    public router: Router ) { 
    this.getLocalStorageVariable();
  }

  islogged(){
    return (this.token.length > 5 ) ? true : false;
  }

  getLocalStorageVariable(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')); 
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  setStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let urlService = URL_SERVICE + '/login/google';

    return this.http.post(urlService,{token}).pipe(
      map((resp: any) => {
        this.setStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));

  }

  login(usuario: Usuario, remindme: boolean = false){
    if (remindme){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let urlService = URL_SERVICE + '/login';

    return this.http.post(urlService, usuario).pipe(
      map((resp: any) => {
        this.setStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  };

  createUser(usuario: Usuario ) {
    let urlService = URL_SERVICE + '/usuario';

    return this.http.post(urlService, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }
}
