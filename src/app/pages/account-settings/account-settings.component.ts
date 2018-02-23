import { Component, OnInit, Inject, Renderer2, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document,
    private renderer: Renderer2,
    private _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck()
  }

  cambiarColor(theme: string, link: any) {

    this.applyCheck(link);
    this._ajustes.aplicarTema(theme);

  }

  private applyCheck(link: ElementRef) {
    const selectors = this._document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    //use Renderer2 the Angular to get DOm elements
    this.renderer.addClass(link, 'working');
    //this.renderer.setAttribute(link, 'data-body', 'active');
  }

  colocarCheck(){
    const selectors:any = this._document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for (const ref of selectors) {
      if( ref.getAttribute('data-theme') === tema){
          ref.classList.add('working');
          break;
      }
    }
  }
}
