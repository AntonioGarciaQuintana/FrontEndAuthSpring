import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { LoginComponent } from './componets/account/login/login.component';
import { HavePermission } from './commons/service/have-permission.permission';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [HavePermission] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
