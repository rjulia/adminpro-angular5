import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      (msj) => console.log('termino', msj)
    ).catch(error => console.log('error en la promesa', error))

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;
      //para detener el setinterval declaramso al variables
      let itervalo = setInterval(() => {
        console.log(contador)
        contador += 1;
        if (contador === 3) {
          resolve(true);
          //reject('simplement un error');
          //detiene el setInterval hay que pasarle la variable qie queremos detener
          clearInterval(itervalo);
        }
      }, 1000);
    });
  }
}
