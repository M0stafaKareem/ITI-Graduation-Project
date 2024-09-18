import { Routes } from '@angular/router';
import { LoginFromComponent } from './login-from/login-from.component';
import { RegisterFromComponent } from './register-from/register-from.component';

export const routes: Routes = [
  { path: 'register', component: RegisterFromComponent, title: 'Register' },
  { path: '', component: LoginFromComponent, title: 'Login' },
];
