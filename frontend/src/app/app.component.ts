import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CasesComponent } from './components/cases/cases-list/cases.component';
import { ClientsComponent } from './components/clients/clients-list/clients.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CasesComponent,
    ClientsComponent,
    SidebarComponent,
    CommonModule,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
}
