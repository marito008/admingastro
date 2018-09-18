import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService ) { 
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

  updateUser(usuario: Usuario){

    let urlService = URL_SERVICE + '/usuario/' + usuario._id;
    urlService += '?token=' + this.token;

    return this.http.put(urlService, usuario).pipe(
      map((resp: any) => {
        // this.usuario = resp.usuario;
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario; 
          this.setStorage(resp.usuario._id, this.token, resp.usuario);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));
  }

  changeImage(archivo: File, id: string ){
    this._uploadFileService.uploadFile(archivo, 'usuarios', id )
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.setStorage(id, this.token, this.usuario);
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
    console.log("Termino: ", termino);
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
