import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { apiBudget } from '../models/budget.interface';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  budgetsAPI = 'http://127.0.0.1:8000/api/budgets';

  apiGetBudgets(): Observable<apiBudget[]> {
    this.spinner.show();
    return this.http
      .get<apiBudget[]>(this.budgetsAPI)
      .pipe(finalize(() => this.spinner.hide()));
  }

  apiAddBudget(budget: apiBudget) {
    this.spinner.show();
    return this.http
      .post(this.budgetsAPI, budget)
      .pipe(finalize(() => this.spinner.hide()));
  }

  apiDeleteBudgetById(budgetId: string) {
    this.spinner.show();
    return this.http
      .delete(`${this.budgetsAPI}/${budgetId}`)
      .pipe(finalize(() => this.spinner.hide()));
  }
}
