import { Injectable } from '@angular/core';
import { Usuario } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

var swal = require('../../../assets/plugins/sweetalert/sweetalert.min');

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    //siempre cargamos el store
    this.cargarStorage();
  }


  // renuevaToken() {

  //   let url = URL_SERVICIOS + '/login/renuevatoken';
  //   url += '?token=' + this.token;

  //   return this.http.get( url )
  //               .map( (resp: any) => {

  //                 this.token = resp.token;
  //                 localStorage.setItem('token', this.token );
  //                 console.log('Token renovado');

  //                 return true;
  //               })
  //               .catch( err => {
  //                 this.router.navigate(['/login']);
  //                 swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
  //                 return Observable.throw( err );
  //               });


  // }

  //servicio para el GUARD que tiene que devolver un True or False, pero tenemos que la propiedad token no esta inicializada
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }
  //Para inicializar lel objeto con los dato s y el TOKEN::::  hacemos la funcion
  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    // El Usuario Lo pasamos por el stringyfy por que viene como un abjeto OOOJJJOOOO
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    //localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    //this.menu = menu;
  }

  //Servicio para salir y resetar las cosas del localstore, cuando hacemos eso , lo enviamos al LOGIN

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }
  //servicio para le registor, el url el token lo que me pide un servicio
  // mirar ala documentacion del backend de postman,
  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                });


  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                })
                .catch( err => {

                  swal( 'Error en el login', err.error.mensaje, 'error' );
                  return Observable.throw( err );
                });

  }


  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';
    //recordar hay desde el servidor nos tiene que dar acceso y para eos configuramos los CORS
    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                })
                .catch( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return Observable.throw( err );
                });

  }
  //Esto para cambiar imagnes utilizamos otro servicio el de la subir-archivo.services
  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          //como es una promesa tengo el then y el catch
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario);

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  // cargarUsuarios( desde: number = 0 ) {

  //   let url = URL_SERVICIOS + '/usuario?desde=' + desde;
  //   return this.http.get( url );

  // }

  // buscarUsuarios( termino: string ) {

  //   let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  //   return this.http.get( url )
  //               .map( (resp: any) => resp.usuarios );

  // }

  // borrarUsuario( id: string ) {

  //   let url = URL_SERVICIOS + '/usuario/' + id;
  //   url += '?token=' + this.token;

  //   return this.http.delete( url )
  //               .map( resp => {
  //                 swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
  //                 return true;
  //               });

  // }

}
