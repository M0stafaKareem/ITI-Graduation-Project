import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NgClass } from '@angular/common';
import { LoginService } from '../../components/login/login.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: { class: 'sidebar-zindex' },
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
    this.closeAllDropdowns();
    this.clientsDropDown = !this.clientsDropDown;
  }
  casesToggle() {
    this.closeAllDropdowns();
    this.casesDropDown = !this.casesDropDown;
  }

  lawyersToggle() {
    this.closeAllDropdowns();
    this.lawyersDropDown = !this.lawyersDropDown;
  }
  financeToggle() {
    this.closeAllDropdowns();
    this.financeDropDown = !this.financeDropDown;
  }

  closeAllDropdowns() {
    this.clientsDropDown = false;
    this.casesDropDown = false;
    this.lawyersDropDown = false;
    this.financeDropDown = false;
  }

  logOut() {
    this.loginService.logout();
  }
}
