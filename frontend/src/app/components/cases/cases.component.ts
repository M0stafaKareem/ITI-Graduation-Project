import { Component } from '@angular/core';
import { CaseComponent } from './case/case.component';
import { TableComponent } from '../../shared/table/table.component';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CaseComponent, TableComponent, SecondaryNavComponent],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent {}
