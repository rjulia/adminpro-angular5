import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/user.model';
import { UsuarioService } from '../../services/service.index';

var swal = require('../../../assets/plugins/sweetalert/sweetalert.min');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe();

  }

  seleccionImage( archivo: File ) {
    //comprobamos si es usuario a puesto un archivo
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    //validacion si es una imagen, ojo que con PHP se puede truncar esta validacion, asi que por seguuirdad habria que hacer mas validaciones.
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    //ya tengo el archivo para subir
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
