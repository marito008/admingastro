import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  constructor(
    public http: HttpClient
  ) { }

  getObraSociales(){
    let urlService = URL_SERVICE + '/obrasocial';

    return this.http.get(urlService).pipe(
      map((resp: any) => {
        console.log('obraSocial: ', resp.obraSocial);
        return resp.obraSocial}));    
  }
}
