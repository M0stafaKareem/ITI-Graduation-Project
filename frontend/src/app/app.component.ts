import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CasesComponent } from './components/cases/cases.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginService } from './login-from/login.service';
import { LoginFromComponent } from './login-from/login-from.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CasesComponent,
    ClientsComponent,
    SidebarComponent,
    LoginFromComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'frontend';
  // isLoggedIn$: Observable<boolean>;

  // constructor(private loginService: LoginService) {
  //   this.isLoggedIn$ = this.loginService.isLoggedIn;
  // }
}
