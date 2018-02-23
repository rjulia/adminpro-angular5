import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: Array<object> = [
    {
      titulo: 'principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo: 'dashborad', url:'/dashboard'},
        {titulo: 'ProgressBAr', url:'/progress'},
        {titulo: 'Gráficas', url:'/grafica1'},
      ]

    }
  ]
  constructor() { }

}
