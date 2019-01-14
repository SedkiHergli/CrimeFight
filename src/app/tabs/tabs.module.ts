import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { AccountuPageModule } from '../pages/accountu/accountu.module';
import { IonicModule } from '@ionic/angular';
import { MapPageModule } from '../pages/map/map.module';
import { WeatherPageModule } from '../pages/weather/weather.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { AddCrimePageModule } from '../pages/add-crime/add-crime.module';
import { VerifyCrimePageModule } from '../pages/verify-crime/verify-crime.module';
import { AddCrimesPageModule } from '../pages/add-crimes/add-crimes.module';
import { CrimeDetailPageModule } from '../pages/crime-detail/crime-detail.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsRoutingModule,
    AccountuPageModule,
    MapPageModule,
    WeatherPageModule,
    SettingsPageModule,
    AddCrimePageModule,
    AddCrimesPageModule,
    CrimeDetailPageModule,
    VerifyCrimePageModule
  ],  
  declarations: [TabsComponent]
})
export class TabsModule { }
