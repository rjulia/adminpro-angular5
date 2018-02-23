import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_pluging();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_pluging();
  }

  ingresar(){
      this.router.navigate(['/dashboard'])
  }

}
