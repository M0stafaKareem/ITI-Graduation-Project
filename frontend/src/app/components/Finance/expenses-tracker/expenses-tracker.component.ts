import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetCardConfig } from '../../../shared/models/budget-card-config.interface';
import { BudgetCategory } from '../../../shared/models/budget-category-interface';
import { apiBudget } from '../../../shared/models/budget.interface';
import { TableDataConfig } from '../../../shared/models/table-data-config.interface';
import { BudgetService } from '../../../shared/services/budget.service';
import { ExpenseService } from '../../../shared/services/expense.service';
import { BudgetCardComponent } from '../budget-card/budget-card.component';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { TableComponent } from '../table/table.component';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { apiExpense } from '../../../shared/models/expense.interface';

@Component({
  selector: 'app-expenses-tracker',
  standalone: true,
  imports: [
    FormWrapperComponent,
    ReactiveFormsModule,
    BudgetCardComponent,
    TableComponent,
  ],
  templateUrl: './expenses-tracker.component.html',
  styleUrl: './expenses-tracker.component.css',
})
export class ExpensesTrackerComponent implements OnInit {
  budgetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    budget: new FormControl(null, [Validators.required]),
  });

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    budgetCategoryId: new FormControl(null, [Validators.required]),
  });

  budgetCategories: BudgetCategory[] = [];
  budgets: apiBudget[] = [];
  budgetCards: BudgetCardConfig[] = [];
  expenses: apiExpense[] = [];
  expenseTableData: TableDataConfig[] = [];

  constructor(
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.budgetService.apiGetBudgets().subscribe({
      next: (data: apiBudget[]) => {
        this.budgets = data;
        this.budgetCategories = this.budgets.map((item) => {
          return {
            id: item.id,
            name: item.budget_name,
            color: 'red',
          };
        });
        this.buildBudgetCards(this.budgets);
      },
      error: (error) => {
        console.error('Error fetching budgets', error);
      },
    });

    this.expenseService.apiGetExpenses().subscribe({
      next: (data: apiExpense[]) => {
        this.expenses = data.map((item: apiExpense) => {
          return {
            ...item,
            budget_name: this.budgets.find(
              (budget: apiBudget) => budget.id === item.budget_id
            )?.budget_name!,
          };
        });
        this.expenseTableData = this.expenseService.buildExpenseTable(
          this.expenses
        );
      },
      error: (error) => {
        console.error('Error fetching expenses', error);
      },
    });
  }

  addBudget() {
    const budget: apiBudget = {
      id: uuidv4(),
      budget_name: this.budgetForm.value.name,
      amount: parseInt(this.budgetForm.value.budget),
      spent: 0,
    };
    this.budgetService.apiAddBudget(budget).subscribe((res) => {
      if (res.message === 'budget created successfully') {
        this.budgets.push(budget);
        this.buildBudgetCards(this.budgets);
        this.budgetForm.reset();
      } else {
        this.toaster.error(res.message, 'Failed');
      }
    });
  }

  addExpense() {
    const category = this.budgets.find(
      (item) => item.id == this.expenseForm.value.budgetCategoryId
    );
    const expense: apiExpense = {
      id: uuidv4(),
      expense_name: this.expenseForm.value.name,
      budget_id: category?.id!,
      budget_name: category?.budget_name!,
      amount: parseFloat(this.expenseForm.value.amount),
      created_at: new Date(),
    };
    this.expenseService.apiAddExpense(expense).subscribe({
      next: (res) => {
        if (res.message === 'expense created successfully') {
          this.expenses.push(expense);
          this.expenseTableData = this.expenseService.buildExpenseTable(
            this.expenses
          );
          this.toaster.success(
            expense.expense_name + ' Created Successfully',
            'DONE'
          );
          this.expenseForm.reset();
        }
      },
      error: (error) => {
        this.toaster.error(error.error.error, 'Failed');
      },
    });
  }

  handleDelete(data: TableDataConfig) {
    this.expenseService.apiDeleteExpenseById(data.id).subscribe((res) => {
      if (res.message === 'expense deleted successfully.') {
        this.toaster.success(`${data.name} Deleted Successfully`, 'Success');
        this.expenses = this.expenses.filter((exp) => exp.id !== data.id);
        this.expenseTableData = this.expenseTableData.filter(
          (exp) => exp.id !== data.id
        );
      } else {
        this.toaster.error(res.message, 'Failed');
      }
    });
  }

  buildBudgetCards(budgets: apiBudget[]) {
    this.budgetCards = budgets.map((item: apiBudget) => {
      return {
        name: item.budget_name,
        budget: item.amount,
        spent: item.spent,
        color: 'red',
        onClick: () => {
          this.router.navigateByUrl(`details/${item.id}`);
        },
      };
    });
  }
}
