import { Injectable } from '@angular/core';
import { BudgetService } from './income.service';
import { Observable, Subject } from 'rxjs';
import { Expense } from '../models/payment.interface';
import { TableDataConfig } from '../models/table-data-config.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  EXPENSES: string = 'PAYMENTS';
  expenseSubject: Subject<Expense[]> = new Subject();
  constructor(private budgetService: BudgetService) {}

  addExpense(expense: Expense) {
    try {
      const budget = this.budgetService.getBudgetById(
        expense.budgetCategory.id
      );
      const expenses = this.getExpenses();
      expenses.push(expense);
      this.setExpense(expenses);
      this.updateExpense(expenses, budget.id);
    } catch (err: any) {
      throw Error(err.message);
    }
  }

  getExpenses(): Expense[] {
    return JSON.parse(localStorage.getItem(this.EXPENSES) || '[]') as Expense[];
  }

  updateExpense(expenses: Expense[], budgetId: string) {
    const budgetExpenses = expenses.filter(
      (item) => item.budgetCategory.id === budgetId
    );
    const totalExpense = budgetExpenses.reduce(
      (sum: number, current: Expense) => sum + current.amount,
      0
    );

    this.budgetService.updateBudgetAmount(budgetId, totalExpense);
  }

  buildExpenseTable(expenses: Expense[]) {
    return expenses.map((item: Expense) => {
      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        date: item.date,
        budget: item.budgetCategory.name,
        color: item.budgetCategory.color,
      };
    }) as TableDataConfig[];
  }

  setExpense(expenses: Expense[]) {
    localStorage.setItem(this.EXPENSES, JSON.stringify(expenses));
    this.expenseSubject.next(expenses);
  }

  deleteExpenseBudgeId(budgetId: string) {
    const expense = this.getExpenses();
    const deleted = expense.filter(
      (expense: Expense) => expense.budgetCategory.id != budgetId
    );
    this.setExpense(deleted);
  }

  deleteExpenseById(expenseId: string) {
    const expenses = this.getExpenses();
    const expense = expenses.filter(
      (expense: Expense) => expense.id === expenseId
    )[0];
    if (!expense) {
      throw Error('can not delete a expense that does not exist ');
      return;
    }

    const deleted = expenses.filter(
      (expense: Expense) => expense.id != expenseId
    );
    this.setExpense(deleted);
    this.updateExpense(deleted, expense.budgetCategory.id);
  }

  getExpensesByBudgetId(budgetId: string) {
    const expense = this.getExpenses();
    return expense.filter(
      (expense: Expense) => expense.budgetCategory.id === budgetId
    );
  }

  getExpenseData(): Observable<Expense[]> {
    return this.expenseSubject;
  }
}
