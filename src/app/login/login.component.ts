import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/user.model';

declare function init_pluging();
//recordemos cuando ponemos librerias de terceros por el HTMLI  link, declaramos al variable por que estmos seguro que luego al inyectar la api, esa variable con ese nombre existira
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_pluging();
    this.googleInit();
    // Esto es para el recuerdame, lo cojemos de localstorege, y addemas le aplicacmos que el recuerdame sea a tru
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }
  //esto es echo a mano de la coumentacion de GOOGLE
  //https://developers.google.com/identity/sign-in/web/listeners
  //esto es la informacion que qeuremos del usuario :::: scope: 'profile email' ::::, si necesimos mas, tenemos que indicarlo ahi

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }
  //eso es para que salte la ventana de GGOOGLE

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      // console.log(profile)
      //tenemos un callback con el objeto ::: googleUser ::: y ahi podemos scar tanto la info del usuario como lo que nos interesa que es el TOKEN UNICO ANTIGUA GUIA window.location.href = '#/dashboard'
      let token = googleUser.getAuthResponse().id_token;
      console.log(token)
      this._usuarioService.loginGoogle( token )
               .subscribe( () => this.router.navigate(['/dashboard']));

    });

  }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }
    // mandamos :::NULL::: como primer paramatero por que el nombre no lo sabemos
    let usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                   .subscribe( correcto => this.router.navigate(['/dashboard']) );

    // // this.router.navigate([ '/dashboard' ]);
  }

}
