import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {

  usuario: Usuario;
  imageUpload: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
    // this.usuario.email = "marito008@gmail.com";
   }

  ngOnInit() {

  }

  save(usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
    
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.updateUser(this.usuario)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  selectImage(archivo: File){
    if (!archivo){
      this.imageUpload = null;
      return;
    }

    if(archivo.type.indexOf('image') <0 ){
      swal('Solo imagenes','El archivo no es una imagen', 'error');
      this.imageUpload = null;
      return;
    }
    this.imageUpload = archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  changeImage(){
    this._usuarioService.changeImage(this.imageUpload, this.usuario._id);
  } 
}
