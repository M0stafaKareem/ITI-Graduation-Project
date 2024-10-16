import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';
import { BudgetCardConfig } from '../../../shared/models/budget-card-config.interface';
import { apiExpense } from '../../../shared/models/expense.interface';
import { TableDataConfig } from '../../../shared/models/table-data-config.interface';
import { BudgetService } from '../../../shared/services/budget.service';
import { ExpenseService } from '../../../shared/services/expense.service';
import { UiService } from '../../../shared/services/ui.service';
import { BudgetCardComponent } from '../budget-card/budget-card.component';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { TableComponent } from '../table/table.component';
import { apiBudget } from '../../../shared/models/budget.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BudgetCardComponent,
    FormWrapperComponent,
    TableComponent,
  ],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css',
})
export class BudgetDetailsComponent {
  budgetCard: BudgetCardConfig = {
    name: 'Loading',
    budget: 0,
    spent: 0,
    color: '',
    onClick: () => {},
  };
  expenseTableData: TableDataConfig[] = [];
  expenses: apiExpense[] = [];
  budget!: apiBudget;
  budgetId: string = '';

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    public uiService: UiService,
    private expenseService: ExpenseService,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.budgetId = params['id'];
      this.initializeData();
    });
  }

  addExpense() {
    const expense: apiExpense = {
      id: uuidv4(),
      expense_name: this.expenseForm.value.name,
      budget_id: this.budgetId,
      budget_name: this.budget.budget_name,
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
    this.initializeData();
  }

  initializeData() {
    this.expenseService.apiGetExpensesByBudgetId(this.budgetId).subscribe({
      next: (budget: apiBudget) => {
        this.budget = budget;
        this.expenses = budget.expenses!.map((item: apiExpense) => {
          return { ...item, budget_name: budget.budget_name };
        });
        this.expenseTableData = this.expenseService.buildExpenseTable(
          this.expenses
        );
        this.budgetCard = {
          name: this.budget.budget_name,
          budget: this.budget.amount,
          spent: this.budget.spent,
          color: 'red',
          onClick: () => {
            this.deleteBudget();
          },
        };
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  deleteBudget() {
    this.budgetService.apiDeleteBudgetById(this.budgetId).subscribe(() => {
      this.router.navigateByUrl('expense-tracker');
    });
  }

  handleAction($event: TableDataConfig) {
    this.expenseService.apiDeleteExpenseById($event.id).subscribe(() => {
      this.initializeData();
    });
  }
}
