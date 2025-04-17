import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/adminguard.guard';


export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
    {path: 'register', loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent)},

    {path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent), canActivate: [authGuard]},
    {path: 'klubcsatlakozas', loadComponent: () => import('./user_pages/klubcsatlakozas/klubcsatlakozas.component').then((c) => c.KlubcsatlakozasComponent), canActivate: [authGuard]},
    {path: 'konyvertekeles', loadComponent: () => import('./user_pages/konyvertekeles/konyvertekeles.component').then((c) => c.KonyvertekelesComponent), canActivate: [authGuard]},
    {path: 'rangsor', loadComponent: () => import('./user_pages/rangsor/rangsor.component').then((c) => c.RangsorComponent), canActivate: [authGuard]},

    {path: 'addbook', loadComponent: () => import('./admin_pages/addbook/addbook.component').then((c) => c.AddbookComponent), canActivate: [adminGuard]},
    {path: 'addclub', loadComponent: () => import('./admin_pages/addclub/addclub.component').then((c) => c.AddclubComponent), canActivate: [adminGuard]},
    {path: 'honapkonyve', loadComponent: () => import('./admin_pages/honapkonyve/honapkonyve.component').then((c) => c.HonapkonyveComponent), canActivate: [adminGuard]},
    {path: 'manageclubs', loadComponent: () => import('./admin_pages/manageclubs/manageclubs.component').then((c) => c.ManageclubsComponent), canActivate: [adminGuard]},
    

    {path: '**', redirectTo: 'dashboard'}
];
