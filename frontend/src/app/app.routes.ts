import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { CasesComponent } from './components/cases/cases.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourtsComponent } from './components/courts/courts.component';
import { AddNewCaseComponent } from './components/cases/add-new-case/add-new-case.component';
import { AddFormComponent } from './shared/add-form/add-form.component';
import { LoginFromComponent } from './login-from/login-from.component';
import { RegisterFromComponent } from './register-from/register-from.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'cases', component: CasesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calender', component: EventCalendarComponent },
  { path: 'court', component: CourtsComponent },
  { path: 'add-case', component: AddFormComponent },
  { path: 'register', component: RegisterFromComponent, title: 'Register' },
  { path: '', component: LoginFromComponent, title: 'Login' },
];
