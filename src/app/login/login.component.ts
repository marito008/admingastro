import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  remindme: boolean = false;
  email: string;
  auth2: any;

  constructor(
    public _usuarioServive: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 1){
      this.remindme = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '1095748920246-u9mh2qd17kp0tfpp4kqsk0ug6t5j6ucm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element ){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioServive.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard');
        });
 
  }

  ingresar(fLogin: NgForm ){
    if (fLogin.invalid){
      return;
    }

    let usuario = new Usuario(null, fLogin.value.email, fLogin.value.password);
    console.log('Ingresar');
    this._usuarioServive.login(usuario, fLogin.value.remindme)
      .subscribe(loginOk => this.router.navigate(['/dashboard']));
    // this.router.navigate([ '/dashboard'])
  }

}
