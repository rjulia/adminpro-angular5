import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription

  constructor() {

    this.subcription = this.regresaObservable()
    //.retry(2) //las veces que quieres tratar de de acerlo, es como una ejemplo si fallara el servidor y quieres llamarlo otra vez por si acado
    .subscribe(
      numero => console.log('subs', numero),
      error => console.error('error en el observer (dos veces)', error),
      ()=> console.log('el observador ha acabado')
    );
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    //para dessubcribirse tines que partir de poner la funcion del obserable bombre una variable de tipo Subcription de RXJS y ahi ya puedes manejarla como quieras, en este caso la manejamos desde el OnDestroy que se ejecuta cuando sales de la pagina. pero podria ser un funcion con un 8click) de parar
    this.subcription.unsubscribe()

  }
  parar(){
    this.subcription.unsubscribe()
  }
  ngOnInit() {
  }

  regresaObservable():Observable<any>{
     // un observable recibe tres callback uno de la respuesta, otro del error, y otro cuando a finalizado
    return new Observable( obser => {

      let contador = 0;

      let intervalos = setInterval(()=>{

        contador+= 1;
        //parte tercera del ejemecicio
        let salida = {
          valor: contador
        }

        obser.next(salida);

        // DE LAS 4 PRIMERAS CLASES
        // if(contador === 3){
        //   clearInterval(intervalos);
        //   //aqui le decimos al observable que ha acabado
        //   obser.complete();
        // }

        // DE LAS 3 PRIMERAS CLASES
        // if( contador == 2) {
        //   //aqui podria ser que la rspuesta del servidor es 500 y si sale eso devolver el errror, con el retry lo intwentadmos un par de veces por si acaso
        //   //clearInterval(intervalos);
        //   obser.error('Auxilio')
        // }

      }, 500)
    })
    // es mejor llebarse el retry a la parte de la logica con la funcion y dejar mas limpia la parte de subcribe.
    .retry(2)
    //el operador map, mapea un observable de tipo objeto y nos devuelve solo el valor que necesitamos, podemos hacer ahi lo que necesitmeso para hacer la limpieza de la respuesta
    .map( (resp:any) =>{
      return resp.valor;
    })
    //aqui podemso filtrar cosas, por ejemplo devolver solo los nueros pares, devuelve un true o false, del valor que le hemos pasado, lo mejor es ejecutar el observable, poner el retry() luego poner el mapeo con map() y al final filtar con filter(), asi cuando nos hemos subscrito, ya tenemos el dato limpio y toda esta logica la ponemos en el servicio.
    .filter((valor, index) =>{
      if(valor % 2 === 1){
        return true
      }else {
        return false
      }
    })
  }
}
