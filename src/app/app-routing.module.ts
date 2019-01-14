import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsModule',canActivate: [AuthGuardService]},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },  { path: 'add-crimes', loadChildren: './pages/add-crimes/add-crimes.module#AddCrimesPageModule' },
  { path: 'crime-detail', loadChildren: './pages/crime-detail/crime-detail.module#CrimeDetailPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
