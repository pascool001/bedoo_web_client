import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthComponent } from './pages/security/auth/auth.component';
import { RegisterComponent } from './pages/security/register/register.component';
import { ForgottenPwdComponent } from './pages/security/forgotten-pwd/forgotten-pwd.component';
import { ResetPwdComponent } from './pages/security/reset-pwd/reset-pwd.component';
import { HomeComponent } from './pages/workspace/home/home.component';
import { ParametresComponent } from './pages/workspace/parametres/parametres.component';
import { UserAdminsComponent } from './pages/workspace/user-admins/user-admins.component';
import { ActivationComponent } from './pages/security/activation/activation.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '/security',
        pathMatch: 'full'
    },
    {
       path: 'security',
       loadComponent: () => import('./pages/security/secu-layout/secu-layout.component').then((m) => m.SecuLayoutComponent),
       children: [
        {
            path:'',
            redirectTo: '/security/auth',
            pathMatch: 'full'
        },
        {
            path: 'auth',
            component: AuthComponent,
            title: 'Authentication'
        },
        {
            path: 'register',
            component: RegisterComponent,
            title: 'Registration'
        },
        {
            path: 'forgotten-pwd',
            component: ForgottenPwdComponent,
            title: 'Password reset request'
        },
        {
            path: 'reset-pwd',
            component: ResetPwdComponent,
            title: 'Password reset',
        },
        {
            path: 'activation',
            component: ActivationComponent,
            title: 'Activation',
        }
       ] 
    },
    {
        path: 'workspace',
        loadComponent: () => import('./pages/workspace/ws-layout/ws-layout.component').then((m) => m.WsLayoutComponent),
        children: [
            {
                path:'',
                redirectTo: '/workspace/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'parameters',
                component: ParametresComponent
            },
            {
                path: 'user-admin',
                component: UserAdminsComponent
            }
        ] 
    },
    {path: '**', component: PageNotFoundComponent}
];




// {
//     path: 'workspace',
//     loadComponent: () => import('./pages/workspace/ws-layout/ws-layout.component').then((m) => m.WsLayoutComponent),
//     children: [
//         {
//             path:'',
//             redirectTo: '/workspace/home',
//             pathMatch: 'full'
//         },
//         {
//             path: 'home',
//             loadComponent: () => import('./pages/workspace/home/home.component').then((m) => m.HomeComponent),
//         },
//         {
//             path: 'parameters',
//             loadComponent: () => import('./pages/workspace/parametres/parametres.component').then((m) => m.ParametresComponent),
//         },
//         {
//             path: 'user-admin',
//             loadComponent: () => import('./pages/workspace/user-admins/user-admins.component').then((m) => m.UserAdminsComponent),
//         }
//        ] 
// },