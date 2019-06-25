import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let urlService = URL_SERVICE + '/img';

    if (!img){
        return urlService + '/usuarios/xxxx';
    }

    if(img.indexOf('https')>=0){
      return img;
    }

    switch(tipo){
      case 'usuario':
        urlService += '/usuarios/' + img;
        break;
      case 'medico':
        urlService += '/medicos/' + img;
        break;
      case 'hospital':
        urlService += '/hospitales/' + img;
        break;    
      default:
        urlService += '/medicos/xxxx';
    }
    return urlService;
  }

}
