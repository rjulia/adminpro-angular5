import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  //Angular no tiene forma de subir archivos, asi que hay que hacerlo puro VANILA JAVASCRIPT, toda esta parte de subir archivos no es de angular
  // el archivo, el tipo de que es y su ID
  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {
      //Creamos una promesa para decir al resto que ha acabado.
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      //configurar el fordata pide tres elementos
      formData.append( 'imagen', archivo, archivo.name );
      //peticion AJAX, onchage paar cualquier cambio
      xhr.onreadystatechange = function() {
        //solo me interesa el estado nuemro 4 que es el finalizado, si quiesieramos jugar con el resto de lso estados por que es como un observable que recibe datos continuamente, podriamso hacer por enjemplo mostrat un LOADING mientras se carga y desaparecer cuando es estado es mayor a 3
        if ( xhr.readyState === 4 ) {
          //hizo correctamente, estoy seguro la imagen subio
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            //aqui el resolved de la promesa.
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            //aqui la el rechazado
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
