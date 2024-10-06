import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NgClass } from '@angular/common';
import { LoginService } from '../../login-from/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;
  clientsDropDown: boolean = false;
  casesDropDown: boolean = false;
  lawyersDropDown: boolean = false;
  financeDropDown: boolean = false;

  constructor(private loginService: LoginService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  clientsToggle() {
    this.clientsDropDown = !this.clientsDropDown;
    this.casesDropDown = false;
  }
  casesToggle() {
    this.casesDropDown = !this.casesDropDown;
    this.clientsDropDown = false;
    this.lawyersDropDown = false;
  }

  lawyersToggle() {
    this.lawyersDropDown = !this.lawyersDropDown;
    this.casesDropDown = false;
    this.clientsDropDown = false;
  }
  financeToggle() {
    this.closeAllDropdowns();
    this.financeDropDown = !this.financeDropDown;
  }

  closeAllDropdowns() {
    this.clientsDropDown = false;
    this.casesDropDown = false;
  }

  logOut() {
    this.loginService.logout();
  }
}
