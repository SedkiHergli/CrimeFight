import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { AccountuPageModule } from '../pages/accountu/accountu.module';
import { IonicModule } from '@ionic/angular';
import { MapPageModule } from '../pages/map/map.module';
import { WeatherPageModule } from '../pages/weather/weather.module';
import { SettingsPageModule } from '../pages/settings/settings.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsRoutingModule,
    AccountuPageModule,
    MapPageModule,
    WeatherPageModule,
    SettingsPageModule
  ],  
  declarations: [TabsComponent]
})
export class TabsModule { }
