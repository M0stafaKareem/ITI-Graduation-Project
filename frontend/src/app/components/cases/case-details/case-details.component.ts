import { Component } from '@angular/core';
import { Case } from '../../../shared/models/case.model';
import { ActivatedRoute } from '@angular/router';
import { SinglePageDetailsComponent } from '../../../shared/single-page-details/single-page-details.component';
import { RowInfoComponent } from '../../../shared/single-page-details/row-info/row-info.component';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { Clients } from '../../../shared/models/clients.model';
import { Lawyers } from '../../../shared/models/lawyers.model';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [SinglePageDetailsComponent, RowInfoComponent],
  templateUrl: './case-details.component.html',
  styleUrls: [
    './case-details.component.css',
    '../../../shared/single-page-details/single-page-details.component.css',
  ],
})
export class CaseDetailsComponent {
  case?: Case;
  client?: Clients;
  category?: CaseCategory;
  lawyer?: Lawyers;
  oppositeLawyer?: Lawyers;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['case'];
    this.case = resolvedData.case;
    this.client = resolvedData.client;
    this.category = resolvedData.category;
    this.lawyer = resolvedData.lawyer;
    this.oppositeLawyer = resolvedData.oppositeLawyer;
  }
}
