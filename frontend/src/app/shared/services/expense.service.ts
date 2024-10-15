import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { apiExpense } from '../models/expense.interface';
import { TableDataConfig } from '../models/table-data-config.interface';
import { HttpClient } from '@angular/common/http';
import { apiBudget } from '../models/budget.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  expensesAPI = 'http://127.0.0.1:8000/api/expenses';
  budgetAPI = 'http://127.0.0.1:8000/api/budgets';

  apiGetExpenses(): Observable<apiExpense[]> {
    this.spinner.show();
    return this.http
      .get<apiExpense[]>(this.expensesAPI)
      .pipe(finalize(() => this.spinner.hide()));
  }

  apiGetExpensesByBudgetId(budgetId: string): Observable<apiBudget> {
    this.spinner.show();
    return this.http
      .get<apiBudget>(`${this.budgetAPI}/${budgetId}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  apiAddExpense(Expense: apiExpense) {
    this.spinner.show();
    return this.http
      .post<{ message: string }>(this.expensesAPI, Expense)
      .pipe(finalize(() => this.spinner.hide()));
  }

  apiDeleteExpenseById(ExpenseId: string) {
    this.spinner.show();
    return this.http
      .delete<{ message: string }>(`${this.expensesAPI}/${ExpenseId}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  buildExpenseTable(expenses: apiExpense[]) {
    return expenses.map((item: apiExpense) => {
      return {
        id: item.id,
        name: item.expense_name,
        amount: item.amount,
        date: item.created_at,
        budget_id: item.budget_id,
        budget: item.budget_name,
        color: 'red',
      };
    }) as TableDataConfig[];
  }
}
