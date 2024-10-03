export interface TodoItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  due_date: Date;
  is_completed: boolean;
}
