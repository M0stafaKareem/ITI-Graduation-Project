import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { CasesComponent } from './components/cases/cases.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourtsComponent } from './components/courts/courts.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { CaseCategoryComponent } from './components/cases/case-category/case-category.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';
import { ClientCategoryComponent } from './components/clients/client-category/client-category.component';
import { ClientResolver } from './components/clients/client-profile/client.resolver';
import { CasesResolver } from './components/cases/cases.resolver';
import { ClientsResolver } from './components/clients/clients.resolver';
import { CaseCategoryResolver } from './components/cases/case-category/case.category.resolver';
import { ClientCategoryResolver } from './components/clients/client-category/client.category.resolver';
import { CaseDetailsComponent } from './components/cases/case-details/case-details.component';
import { CaseResolver } from './components/cases/case-details/case.details.resolver';
import { CourtsResolver } from './components/courts/courts.resolver';
import { CaseGradeComponent } from './components/cases/case-grade/case-grade.component';
import { CaseGradeResolver } from './components/cases/case-grade/case.grade.resolver';
import { LawyersComponent } from './components/lawyers/lawyers/lawyers.component';
import { LawyersResolver } from './components/lawyers/lawyers/lawyers.resolver';
import { OppositeLawyersComponent } from './components/lawyers/opposite-lawyers/opposite-lawyers.component';
import { OppositeLawyersResolver } from './components/lawyers/opposite-lawyers/opposite-lawyers.resolver';
import { MailConfirmationPageComponent } from './mail-confirmation-page/mail-confirmation-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ExpensesTrackerComponent } from './components/expenses-tracker/expenses-tracker.component';
import { BudgetDetailsComponent } from './components/expenses-tracker/budget-details/budget-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
    outlet: 'authentication',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    outlet: 'authentication',
  },
  {
    path: 'verify-email',
    component: MailConfirmationPageComponent,
    title: 'Mail Confirmation',
    outlet: 'authentication',
  },
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
    path: 'lawyers',
    component: LawyersComponent,
    resolve: { lawyers: LawyersResolver },
  },
  {
    path: 'opposite-lawyers',
    component: OppositeLawyersComponent,
    resolve: { lawyers: OppositeLawyersResolver },
  },
  {
    path: 'cases',
    component: CasesComponent,
    resolve: { data: CasesResolver },
  },
  {
    path: 'cases/:id',
    component: CaseDetailsComponent,
    resolve: { case: CaseResolver },
  },
  {
    path: 'case-categories',
    component: CaseCategoryComponent,
    resolve: {
      categories: CaseCategoryResolver,
    },
  },
  {
    path: 'case-grades',
    component: CaseGradeComponent,
    resolve: {
      grades: CaseGradeResolver,
    },
  },
  {
    path: 'courts',
    component: CourtsComponent,
    resolve: {
      courts: CourtsResolver,
    },
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calender', component: EventCalendarComponent },
  { path: 'court', component: CourtsComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'expense-tracker', component: ExpensesTrackerComponent },
  { path: 'details/:id', component: BudgetDetailsComponent },
];
