import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  uploadFile( archivo: File, tipo: string, id: string){

    return new Promise((resolve, reject) => {
      let formData = new FormData();
  
      let xhr = new XMLHttpRequest();
  
      formData.append('imagen', archivo, archivo.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo al subir imagen.');
            reject(xhr.response);
          }
        }
      };
      let url = URL_SERVICE + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  };

}
