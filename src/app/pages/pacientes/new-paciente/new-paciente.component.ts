import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Paciente } from '../../../models/paciente';
import { ObraSocialService } from '../../../service/service.index';
import { ObraSocial } from '../../../models/obra-social.model';
import { PacientesService } from '../../../service/pacientes/pacientes.service';

@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styleUrls: ['./new-paciente.component.css'],
  providers: []
})
export class NewPacienteComponent implements OnInit {

  paciente: Paciente = new Paciente ('', '', null, null, '');
  obraSociales: ObraSocial[] = [];

  constructor(
    public _pacientesService: PacientesService,
    public _obraSocialService: ObraSocialService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getObraSociales();
  }
  
  getObraSociales(){
    this._obraSocialService.getObraSociales()
    .subscribe(obraSociales => this.obraSociales = obraSociales);
  }

  savePaciente(f: NgForm){
    if(f.invalid) {
      return;
    }

    this._pacientesService.savePaciente(this.paciente)
      .subscribe(paciente => {
        this.paciente._id = paciente._id;
        this.router.navigate(['/pacientes']);
    });
  }
}
