import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import swal from 'sweetalert';
//Da un error asi que esta puesto aqui desde la carpeta plugins y no desde el NODE MODULES
//ojo que se añadio en el tsconfig esto
// "types": [
//   "node"
// ],
// "typeRoots": [
//   "../node_modules/@types"
// ]
var swal = require('../../assets/plugins/sweetalert/sweetalert.min');

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_pluging();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {


  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  //Funcion personalizada para validar campos
  sonIguales( campo1: string, campo2: string ) {
    //Para qeu funcione tiene que retornar un fuction con ( group: FormGroup )
    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    init_pluging();

      this.forma = new FormGroup({
        //Hacemos la svalilidaciones con FOrmControl, [Validators.required, Validators.email] puedes meter un arreglo para avliadr mas de uan condicion
        nombre: new FormControl( null , Validators.required ),
        correo: new FormControl( null , [Validators.required, Validators.email] ),
        password: new FormControl( null , Validators.required ),
        password2: new FormControl( null , Validators.required ),
        condiciones: new FormControl( false )
        //validaciones personalizadas, espera una funcion, en este caso pasamos dos parametros
      }, { validators: this.sonIguales( 'password', 'password2' )  } );


      //esto es para rellenar el formulario de parte de TESTEO OJOOO
      this.forma.setValue({
        nombre: 'Test ',
        correo: 'test@test.com',
        password: '123456',
        password2: '123456',
        condiciones: true
      });
  }

  registrarUsuario() {
    console.log(this.forma.value)
    console.log(this.forma.valid)
    //hacemso los tres primeros If para validar los datos, si son invalidos y y validar condiciones no esta puesto echa para atras el poder validarse y
    if ( this.forma.invalid ) {
      return;
    }
    //SWAL es el sweet alert mirar la documentacion https://sweetalert.js.org/guides/#getting-started
    if ( !this.forma.value.condiciones ) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    //Creamos el usuario apartir del modelo USUARIO desde nuestros mMODELOS
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    //recordar hay desde el servidor nos tiene que dar acceso y para eos configuramos los CORS, LUEGO APLIACMOS EL ROUTER PARA IR A LA pagian del login
    this._usuarioService.crearUsuario( usuario )
               .subscribe( resp => this.router.navigate(['/login']));


  }

}
