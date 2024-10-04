import { BudgetCategory } from "./budget-category-interface";

export interface Expense{
    id: string;
    name: string;
    budgetCategory: BudgetCategory;
    amount: number;
    date: Date

}