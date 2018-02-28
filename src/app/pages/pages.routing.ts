
import { Routes, RouterModule } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    canActivate:[ LoginGuardGuard ],
    children:[
      { path: 'dashboard', component: DashboardComponent, data:{ titulo: 'Dashboard', description: 'pagina princiapl'} },
      { path: 'progress', component: ProgressComponent, data:{ titulo: 'progressBars', keywords: 'evoluciones, ventas, descuentos', description: 'pagina de progresos'}},
      { path: 'grafica1', component: Graficas1Component, data:{ titulo: 'Gráficas', keywords: 'grafica, ventas, descuentos', description: 'pagina graficas'} },
      { path: 'promesas', component: PromesasComponent, data:{ titulo: 'Pormesas',description: 'pagina promesas'} },
      { path: 'rxjs', component: RxjsComponent, data:{ titulo: 'RxJs',description: 'pagina RXJS'}},
      { path: 'account-settings', component: AccountSettingsComponent, data:{ titulo: 'Ajustes de tema',description: 'pagina ajustes'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

