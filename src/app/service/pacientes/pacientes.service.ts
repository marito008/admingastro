import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../service.index';
import { Paciente } from '../../models/paciente';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  totalPacientes: number = 0; 
  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient) { }

  ngOnInit() {
  }

  getPacientes(){
    let urlService = URL_SERVICE + '/paciente';

    return this.http.get(urlService).pipe(
      map((resp: any) => {
        this.totalPacientes = resp.total;

        return resp.pacientes}));    
  }

  cargarPaciente (id: string){
    let urlService = URL_SERVICE + '/paciente/' + id;

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.paciente));
  }

  searchPaciente(termino: string){
    let urlService = URL_SERVICE + '/busqueda/coleccion/pacientes/' + termino;

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.pacientes));

  }

  savePaciente(paciente: Paciente){
    let urlService = URL_SERVICE + '/paciente';

    if (paciente._id){
      urlService += '/' + paciente._id;
      urlService += '?token=' + this._usuarioService.token;

      return this.http.put(urlService, paciente).pipe(
        map((resp: any) => {
          swal('Paciente actualizado', paciente.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      urlService += '?token=' + this._usuarioService.token;

      return this.http.post(urlService, paciente).pipe(
        map((resp: any) => {
          swal('Paciente creado', paciente.nombre, 'success');
          return resp.paciente;
        }),
        catchError((err: any) => {
          swal('Error!!!', err.error.mensaje, 'error');
          return throwError(err);
        }));
    }    
  }
}
