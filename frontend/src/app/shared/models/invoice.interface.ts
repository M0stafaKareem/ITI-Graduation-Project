export interface Budget {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
}
export interface apiBudget {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  budget_name: string;
  amount: number;
  spent: number;
  // expenses: expense[];
}
