import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';
    //Configuramos en el backend que si no existe la imagen regresamos un NOIMG
    if ( !img ) {
      return url + '/usuarios/xxx';
    }
    //miramoes si contiene en la URL el 'https', lo cual lo buscamos por indexOf si es mayor
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
  //hacemos un swich para evaluar de que tipo es la imagen
    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
         url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }

    return url;
  }

}
