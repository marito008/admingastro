import { Component, OnInit, Inject } from '@angular/core';
import { Color } from 'ng2-charts';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../service/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeTheme(theme: String, link: any){
    this.aplicarCheck(link);

    this._ajustes.aplicarTema(theme);
  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let theme = this._ajustes.ajustes.tema;

    for (let ref of selectores){
      if(ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }

    }      
  }
}
