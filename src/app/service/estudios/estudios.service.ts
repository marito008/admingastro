import { Injectable } from '@angular/core';
import { UsuarioService } from '../service.index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  constructor( 
    public _usuarioService: UsuarioService,
    public http: HttpClient) { }
  
  ngOnInit(){
  }

  // savePaciente(paciente: Paciente){
  //   let urlService = URL_SERVICE + '/estudio';

  //   if (paciente._id){
  //     urlService += '?token=' + this._usuarioService.token;

  //     return this.http.post(urlService, paciente).pipe(
  //       map((resp: any) => {
  //         swal('Paciente creado', paciente.nombre, 'success');
  //         return resp.paciente;
  //       }),
  //       catchError((err: any) => {
  //         swal('Error!!!', err.error.mensaje, 'error');
  //         return throwError(err);
  //       }));
  //   }  
  
  savePaciente(){
    console.log('Hola');
  }

}
