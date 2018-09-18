import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  comparePassword(pass: string, confPass: string){

    return ((group: FormGroup)=> {
      let password = group.controls[pass].value;
      let confirm = group.controls[confPass].value;

      if (password === confirm){
        return null;
      } else {
        return {
          isEquals: true}
      }
    });
  }

  ngOnInit() {
    init_plugins();

    this.formRegister = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password:  new FormControl(null, Validators.required),
      confirmPass: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, {validators: this.comparePassword('password', 'confirmPass')})

    this.formRegister.setValue({
        nombre: 'Mario',
        email: 'test@test.com',
        password: '123456',
        confirmPass: '123456',
        conditions: true

    });
  }

  registerUser(){
    if(!this.formRegister.valid){
      return;
    }
    if(!this.formRegister.value.conditions){
      swal('Importante', 'Debe aceptar las condiciones.', 'warning');
      return;
    }

    let user = new Usuario(
      this.formRegister.value.nombre,
      this.formRegister.value.email,
      this.formRegister.value.password
    );

    this._usuarioService.createUser(user)
      .subscribe( res=> this.router.navigate(['/login']));
  }
}
