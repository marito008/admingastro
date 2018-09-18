import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde:  number = 0;
  totalRegistros:  number = 0;
  loading: boolean = false;

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
    this.loading = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any)=> {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.total;
        this.loading = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if(termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }
    this.loading = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[])=> {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.loading = false;
      });

  }

  eliminarUsuario(usuario: Usuario) {
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No se puede borrar.', 'No se puede borrar a si mismo.', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a  punto de eliminar a ' + usuario.nombre +'.',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {
        this._usuarioService.eliminarUsuarios(usuario._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.cargarUsuarios();
          })
      }
    });    
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.updateUser(usuario)
      .subscribe();
  }
}
