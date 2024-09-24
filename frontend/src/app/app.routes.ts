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
import { ClientResolver } from './components/clients/client-profile/client.resolver';
import { CasesResolver } from './components/cases/cases.resolver';
import { ClientsResolver } from './components/clients/clients.resolver';
import { CaseCategoryResolver } from './components/cases/case-category/case.category.resolver';
import { ClientCategoryResolver } from './components/clients/client-category/client.category.resolver';

export const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
    resolve: { data: ClientsResolver },
  },
  {
    path: 'clients/:id',
    component: ClientProfileComponent,
    resolve: { client: ClientResolver },
  },
  { path: 'clientCategories', component: ClientCategoryComponent },
  {
    path: 'client-categories',
    component: ClientCategoryComponent,
    resolve: {
      clientCategories: ClientCategoryResolver,
    },
  },
  {
    path: 'cases',
    component: CasesComponent,
    resolve: { data: CasesResolver },
  },
  {
    path: 'case-categories',
    component: CaseCategoryComponent,
    resolve: {
      categories: CaseCategoryResolver,
    },
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calender', component: EventCalendarComponent },
  { path: 'court', component: CourtsComponent },
  { path: 'register', component: RegisterFromComponent, title: 'Register' },
  { path: '', component: LoginFromComponent, title: 'Login' },
];
