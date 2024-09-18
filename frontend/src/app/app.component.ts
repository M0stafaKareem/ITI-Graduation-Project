import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CasesComponent } from './components/cases/cases.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AddFormComponent } from './shared/add-form/add-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CasesComponent,
    ClientsComponent,
    SidebarComponent,
    AddFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
