import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService ) { 
    this.getLocalStorageVariable();
  }

  renovarToken(){
    let urlService = URL_SERVICE + '/login/updatelogin';
    urlService += '?token=' + this.token;

    return this.http.get(urlService).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError((err: any) => {
        this.router.navigate(['/login']);
        swal('No se puedo renovar token.', 'No fue posible renovar e token.', 'error');
        return throwError(err);
      }));

  }

  islogged(){
    return (this.token.length > 5 ) ? true : false;
  }

  getLocalStorageVariable(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')); 
      this.menu = JSON.parse(localStorage.getItem('menu')); 
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  setStorage(id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');   
    localStorage.removeItem('menu');   

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let urlService = URL_SERVICE + '/login/google';

    return this.http.post(urlService,{token}).pipe(
      map((resp: any) => {
        this.setStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.setStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError((err: any) => {
        swal('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
      }));
  };

  createUser(usuario: Usuario ) {
    let urlService = URL_SERVICE + '/usuario';

    return this.http.post(urlService, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError((err: any) => {
        swal(err.error.mensaje, err.error.mensaje, 'error');
        return throwError(err);
      }));
  }

  updateUser(usuario: Usuario){

    let urlService = URL_SERVICE + '/usuario/' + usuario._id;
    urlService += '?token=' + this.token;

    return this.http.put(urlService, usuario).pipe(
      map((resp: any) => {
        // this.usuario = resp.usuario;
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario; 
          this.setStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError((err: any) => {
        swal(err.error.mensaje, err.error.mensaje, 'error');
        return throwError(err);
      }));
  }

  changeImage(archivo: File, id: string ){
    this._uploadFileService.uploadFile(archivo, 'usuarios', id )
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.setStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let urlService = URL_SERVICE + '/usuario?desde=' + desde; 

    return this.http.get(urlService);
  }

  buscarUsuarios(termino: string) {
    let urlService = URL_SERVICE + '/busqueda/coleccion/usuarios/' + termino; 

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.usuarios));
  }

  eliminarUsuarios(id: string) {
    
    let urlService = URL_SERVICE + '/usuario/' + id; 
    urlService += '?token=' + this.token;

    return this.http.delete(urlService).pipe(
      map(resp => {
        swal('Usuario Eliminado', 'El usuario se elimino correctamente', 'success');
        return true;
      })
    );
  
  }
}
