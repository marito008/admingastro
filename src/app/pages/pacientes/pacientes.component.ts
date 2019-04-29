import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacientesService } from 'src/app/service/pacientes/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [];
  pagReg:  number = 0;
  totalRegistros:  number = 0;

  constructor(
    public _pacientesService: PacientesService) { }

  ngOnInit() {
    this.getPacientes();
    console.log('Pacientes: ', this.pacientes);
  }

  getPacientes(){
    this._pacientesService.getPacientes()
    .subscribe(pacientes => this.pacientes = pacientes);
    
  }

  cambiarPagina(valor: number) {
    let pagReg = this.pagReg + valor;

    if(pagReg >= this.totalRegistros){
      return;
    }
    if(pagReg < 0){
      return;
    }
    
    this.pagReg += valor;
    this.getPacientes();
  }

  searchPacientes(termino: string){
    if (termino.length <=0) {
      this.getPacientes();
      return;  
    }
    this._pacientesService.searchPaciente(termino)
      .subscribe(pacientes => this.pacientes = pacientes);
  }
}
