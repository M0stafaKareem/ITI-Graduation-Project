import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CasesService } from '../../../shared/services/cases.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'td[casetd], app-case',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  @Input() caseName: any;
  @Input() caseId: any;
  @Input() caseCategory: any;
  @Input() caseDate: any;
  @Input() caseGrade: any;
  @Input() caseDetail: any;
}
