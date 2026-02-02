import { Routes } from '@angular/router';
import { SignIn } from './components/sign-in/sign-in';
import { WelcomePage } from './components/welcome-page/welcome-page';
import { Dashboard } from './components/dashboard/dashboard';
import { AuthGuard } from './auth-guard';
import { IsAuthenticatedGuard } from './is-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
  },
  {
    path: 'sign-in',
    component: SignIn,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'sign-in' },
];
