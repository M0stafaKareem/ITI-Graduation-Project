import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../shared/services/expense.service';
import { BudgetService } from '../../shared/services/budget.service';
import { BudgetCategory } from '../../shared/models/budget-category-interface';
import { Budget } from '../../shared/models/budget.interface';
import { v4 as uuidv4 } from 'uuid';
import { BudgetCardConfig } from '../../shared/models/budget-card-config.interface';
import { Router } from '@angular/router';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { UiService } from '../../shared/services/ui.service';
import { Expense } from '../../shared/models/expense.interface';
import { TableDataConfig } from '../../shared/models/table-data-config.interface';
import { TableComponent } from './table/table.component';

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
  budgets: Budget[] = [];
  budgetCards: BudgetCardConfig[] = [];
  expenseTableData: TableDataConfig[] = [];
  constructor(
    // public userService: UserService,
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.budgetCategories = this.budgetService.getBudgetCategories();
    this.budgets = this.budgetService.getBudgets();
    this.buildBudgetCards(this.budgets);
    this.budgetService.getBudgetData().subscribe({
      next: (res: Budget[]) => {
        this.budgets = res;
        this.buildBudgetCards(this.budgets);
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    this.budgetService.getBudgetCategoryData().subscribe({
      next: (res: BudgetCategory[]) => {
        this.budgetCategories = res;
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    const expenses = this.expenseService.getExpenses();
    this.expenseTableData = this.expenseService.buildExpenseTable(expenses);
    this.expenseService.getExpenseData().subscribe({
      next: (res: Expense[]) => {
        this.expenseTableData = this.expenseService.buildExpenseTable(res);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  addBudget() {
    const budget: Budget = {
      id: uuidv4(),
      name: this.budgetForm.value.name,
      budget: parseInt(this.budgetForm.value.budget),
      spent: 0,
      color: this.uiService.generateRandomColor(this.budgets.length + 1),
    };

    this.budgetService.addBudget(budget);
    this.budgetForm.reset();
  }

  addExpense() {
    const category = this.budgetService.getBudgetById(
      this.expenseForm.value.budgetCategoryId
    );
    const expense: Expense = {
      id: uuidv4(),
      name: this.expenseForm.value.name,
      budgetCategory: category,
      amount: parseFloat(this.expenseForm.value.amount),
      date: new Date(),
    };
    // add exposne
    this.expenseService.addExpense(expense);
    this.expenseForm.reset();
  }

  handleDelete(data: TableDataConfig) {
    this.expenseService.deleteExpenseById(data.id);
  }

  buildBudgetCards(budgets: Budget[]) {
    this.budgetCards = budgets.map((item: Budget) => {
      return {
        name: item.name,
        budget: item.budget,
        spent: item.spent,
        color: item.color,
        onClick: () => {
          this.router.navigateByUrl(`details/${item.id}`);
        },
      };
    });
  }
}
