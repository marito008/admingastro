import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuarios/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalesService {

  // hospitales: Hospital;
  totalHospitales: number = 0;
  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarHospitales(){
    let urlService = URL_SERVICE + '/hospital';

    return this.http.get(urlService).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;

        console.log(resp.hospitales);
        return resp.hospitales}));

  }

  obtenerHospital(id: string){
    let urlService = URL_SERVICE + '/hospital/' + id;

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.hospital));

  }

  borrarHospital(id: string){
    let urlService = URL_SERVICE + '/hospital/' + id;
    urlService += '?token=' + this._usuarioService.token;

    return this.http.delete(urlService).pipe(
      map((resp: any) => {
        swal('Hospital Eliminado', 'Hospital eliminado correctamente', 'success')}));
  }

  crearHospital(nombre: string){
    let urlService = URL_SERVICE + '/hospital/' + nombre;
    urlService += '?token=' + this._usuarioService.token;

    return this.http.post(urlService, {nombre}).pipe(
      map((resp: any)=> resp.hopital));
  }

  buscarHospital(termino: string){
    let urlService = URL_SERVICE + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(urlService).pipe(
      map((resp: any) => resp.hospitales));

  }

  actualizarHospital(hospital: Hospital){
    let urlService = URL_SERVICE + '/hospitales/' + hospital._id;
    urlService += '?token=' + this._usuarioService.token;

    return this.http.put(urlService, hospital).pipe(
      map((resp: any) => {
        swal('Hospital Actualizado', 'Hospital actualizado correctamente', 'success')
        return resp.hospital;       
      }));

  }
}
