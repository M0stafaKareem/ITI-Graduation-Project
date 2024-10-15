import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BudgetCardConfig } from '../../../../shared/models/budget-card-config.interface';
import { Expense } from '../../../../shared/models/payment.interface';
import { TableDataConfig } from '../../../../shared/models/table-data-config.interface';
import { BudgetService } from '../../../../shared/services/income.service';
import { ExpenseService } from '../../../../shared/services/income-details.service';
import { UiService } from '../../../../shared/services/ui.service';
import { BudgetCardComponent } from '../../budget-card/budget-card.component';
import { FormWrapperComponent } from '../../form-wrapper/form-wrapper.component';
import { TableComponent } from '../../table/table.component';
import { v4 } from 'uuid';

@Component({
  selector: 'app-income-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BudgetCardComponent,
    FormWrapperComponent,
    TableComponent,
  ],
  templateUrl: './income-details.component.html',
  styleUrl: './income-details.component.css',
})
export class IncomeDetailsComponent {
  budgetCard!: BudgetCardConfig;
  expenseTableData: TableDataConfig[] = [];
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
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.budgetId = params['id'];
      this.initializeData();

      const expenses = this.expenseService.getExpensesByBudgetId(this.budgetId);
      this.expenseTableData = this.expenseService.buildExpenseTable(expenses);

      this.expenseService.getExpenseData().subscribe({
        next: (res: Expense[]) => {
          const expenses = this.expenseService.getExpensesByBudgetId(
            this.budgetId
          );
          this.expenseTableData =
            this.expenseService.buildExpenseTable(expenses);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    });
  }

  addExpense() {
    const category = this.budgetService.getBudgetCategoryById(this.budgetId);
    const expense: Expense = {
      id: v4(),
      name: this.expenseForm.value.name,
      budgetCategory: category,
      amount: parseInt(this.expenseForm.value.amount),
      date: new Date(),
    };

    this.expenseService.addExpense(expense);
    this.expenseForm.reset();

    this.initializeData();
  }

  initializeData() {
    const budget = this.budgetService.getBudgetById(this.budgetId);

    this.budgetCard = {
      name: budget.name,
      budget: budget.budget,
      spent: budget.spent,
      color: budget.color,
      onClick: () => {
        this.deleteBudget();
        this.router.navigateByUrl('incomes-tracker');
      },
    };
  }

  deleteBudget() {
    this.expenseService.deleteExpenseBudgeId(this.budgetId);
    this.budgetService.deleteBudgetById(this.budgetId);
    this.router.navigateByUrl('');
  }

  handleAction($event: TableDataConfig) {
    this.expenseService.deleteExpenseById($event.id);
    this.initializeData();
  }
}
