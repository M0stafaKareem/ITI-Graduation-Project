import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { CasesComponent } from './components/cases/cases.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourtsComponent } from './components/courts/courts.component';
import { LoginFromComponent } from './login-from/login-from.component';
import { RegisterFromComponent } from './register-from/register-from.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { CaseCategoryComponent } from './components/cases/case-category/case-category.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';
import { ClientCategoryComponent } from './components/clients/client-category/client-category.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/:id', component: ClientProfileComponent },
  { path: 'clientCategories', component: ClientCategoryComponent },
  { path: 'cases', component: CasesComponent },
  { path: 'caseCategories', component: CaseCategoryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calender', component: EventCalendarComponent },
  { path: 'court', component: CourtsComponent },
  { path: 'register', component: RegisterFromComponent, title: 'Register' },
  { path: '', component: LoginFromComponent, title: 'Login' },
];
