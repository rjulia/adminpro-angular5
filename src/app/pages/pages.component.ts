import { Component, OnInit } from '@angular/core';
// englobando una pluging con una funcion nuestra podemos inicializar al arraque de la entrada de nuestro componente o pagina cualquier plugin externo declarando la funcion y poniendola en el INIY por que sabemos que existe.
// vease que se a retocado el fichero custon.js y se a puesto la funcion init_plugins()


declare function init_pluging();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pluging()
  }

}
