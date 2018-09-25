import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];
        this.buscar(termino);
      });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    let urlService = URL_SERVICE + '/busqueda/todo/' + termino;

    return this.http.get(urlService)
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;

        console.log(resp);
      })
  }
}
