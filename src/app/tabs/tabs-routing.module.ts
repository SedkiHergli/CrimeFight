import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { AccountuPage } from '../pages/accountu/accountu.page';
import { MapPage } from '../pages/map/map.page';
import { WeatherPage } from '../pages/weather/weather.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { AuthGuardService } from './../services/auth-guard.service';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(accountu:accountu)',
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'accountu',
        outlet: 'accountu',
        component: AccountuPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'map',
        outlet: 'map',
        component: MapPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'weather',
        outlet: 'weather',
        component: WeatherPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'settings',
        outlet: 'settings',
        component: SettingsPage,
        canActivate: [AuthGuardService],

      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(accountu:accountu)',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
