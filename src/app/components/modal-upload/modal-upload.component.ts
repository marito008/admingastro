import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imagenTemp: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  // subirImagen() {
  //   console.log('Subir Imagen!!');
  // }

  cerrarModal(){
    this.imagenTemp = null;
    this.imageUpload = null;

    this._modalUploadService.ocultarModal();
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

  subirImagen(){
    this._uploadFileService.uploadFile(this.imageUpload, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga');
      });
  }
}
