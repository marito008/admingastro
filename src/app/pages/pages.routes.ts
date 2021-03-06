import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import {LoginGuardGuard, AdminGuard, VerifyTokenGuard} from '../service/service.index';
import { ProfilesComponent } from './profiles/profiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { NewPacienteComponent } from './pacientes/new-paciente/new-paciente.component';
import { EstudiosComponent } from './estudios/estudios/estudios.component';


const pagesRoutes: Routes= [

    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        // canActivate: [VerifyTokenGuard],
        data: {titulo: "Dashboard"} 
    },
    {
        path: 'pacientes',
        component: PacientesComponent,
        data: { titulo: 'Pacientes'}
    },
    {
        path: 'new-paciente/nuevo',
        component: NewPacienteComponent,
        data: { titulo: 'Agregar Paciente'}
    },
    {
        path: 'estudio/:id',
        component: EstudiosComponent,
        data: { titulo: 'Crear Estudio'}
    },
    { path: 'progress', component: ProgressComponent, data: {titulo: "Progress"}  },
    { path: 'graficas', component: Graficas1Component, data: {titulo: "Graficas"}  },
    { path: 'promesas', component: PromesasComponent, data: {titulo: "Promesas"}  },
    { path: 'rxjs', component: RxjsComponent, data: {titulo: "RxJs"}  },
    { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: "Ajustes de Tema"}  },
    { path: 'profile', component: ProfilesComponent, data: {titulo: "Perfil de Usuario"}  },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: "Buscador"}  },
    //Mantenimientos
    { path: 'usuarios', 
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: {titulo: "Mantenimiento de Usuarios"} },
    { path: 'hospitales', component: HospitalesComponent, data: {titulo: "Mantenimiento de Hospitales"} },
    { path: 'medicos', component: MedicosComponent, data: {titulo: "Mantenimiento de Medicos"} },
    { path: 'medico/:id', component: MedicoComponent, data: {titulo: "Actualizar Medico"} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);