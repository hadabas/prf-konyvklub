import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
    {path: 'register', loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent)},
    {path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent), canActivate: [authGuard]},
    {path: 'klubcsatlakozas', loadComponent: () => import('./user_pages/klubcsatlakozas/klubcsatlakozas.component').then((c) => c.KlubcsatlakozasComponent), canActivate: [authGuard]},
    {path: 'konyvertekeles', loadComponent: () => import('./user_pages/konyvertekeles/konyvertekeles.component').then((c) => c.KonyvertekelesComponent), canActivate: [authGuard]},
    {path: '**', redirectTo: 'dashboard'}
];
