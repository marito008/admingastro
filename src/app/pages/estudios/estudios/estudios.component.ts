import { Component, OnInit, Input } from '@angular/core';
import { PacientesService } from '../../../service/pacientes/pacientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente';
import { NgForm } from '@angular/forms';
import { Estudio } from 'src/app/models/estudio.model';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  
  types: any [] ;
  selectedStudy: string;
  paciente: Paciente = new Paciente('', '', null, null, '', '', null);
  asistente: string = '';
  description: string;
  edad: number;
  os: String;
  estudio: Estudio = new Estudio();
  vccMotivos: any [] = [{"id": 1, "motivo": "Motivo 1"},
                       {"id": 2, "motivo": "Motivo 2"},
                       {"id": 3, "motivo": "Motivo 3"}];

  constructor(
    public _pacienteService: PacientesService,
    public activatedRoute: ActivatedRoute,
    public router: Router) { 

    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      
      if (id !== 'nuevo') {
        this.cargarPaciente(id);
      }
    });
    
  }
  
  ngOnInit() {
    
  }
  
  cargarPaciente(id: string) {
    this._pacienteService.cargarPaciente(id)
    .subscribe(paciente => {
      this.paciente = paciente;
      this.os = paciente.obraSocial.nombre;
      console.log("paciente: ", this.paciente);
      this.edad = this.obtenerEdad(this.paciente.fechaNac);

      });

  }

  saveEstudio(f: NgForm){
    if(f.invalid) {
      return;
    }
    console.log('Estudio', this.estudio);
    this._pacienteService.savePaciente(this.paciente)
      .subscribe(paciente => {
        this.paciente._id = paciente._id;
        this.router.navigate(['/paciente', paciente._id]);
      });
  }  

  obtenerEdad(a: Date){
    let now = new Date();
    let anioNac = new Date(a);
    let anio = now.getFullYear() as number;
    let anioN = anioNac.getFullYear() as number;
    return  anio - anioN;
    // return  1;
  }
}
