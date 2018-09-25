import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuarios/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarMedicos(){
    let urlService = URL_SERVICE + '/medico';

    return this.http.get(urlService).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos
      }));
  }

  cargarMedico (id: string){
    let urlService = URL_SERVICE + '/medico/' + id;

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.medico));
  }

  buscarMedicos(termino: string) {
    let urlService = URL_SERVICE + '/busqueda/coleccion/medicos/' + termino; 

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.medicos));
  }

  eliminarMedico(id: string){
    let urlService = URL_SERVICE + '/medico/' + id;
    urlService += '?token=' + this._usuarioService.token;

    return this.http.delete(urlService).pipe(
      map(resp => {
        swal('Médico eliminado', 'Se eliminó correctamente el médico.', 'success');
        return resp;
      }));
  }

  guardarMedico(medico: Medico){
    let urlService = URL_SERVICE + '/medico';

    if (medico._id){
      urlService += '/' + medico._id;
      urlService += '?token=' + this._usuarioService.token;

      return this.http.put(urlService, medico).pipe(
        map((resp: any) => {
          swal('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      urlService += '?token=' + this._usuarioService.token;
  
      return this.http.post(urlService, medico).pipe(
        map((resp: any) => {
          swal('Médico creado', medico.nombre, 'success');
          return resp.medico;
        }));
    }
  }


}
