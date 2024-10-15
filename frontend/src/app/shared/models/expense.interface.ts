import { BudgetCategory } from './budget-category-interface';

export interface Expense {
  id: string;
  name: string;
  budgetCategory: BudgetCategory;
  amount: number;
  date: Date;
}

export interface apiExpense {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  expense_name: string;
  amount: number;
  budget_id: string;
  budget_name: string;
}
