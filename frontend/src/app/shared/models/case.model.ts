import { Clients } from './clients.model';

export interface Case {
  id: number;
  case_name: string;
  case_date: string;
  first_session_date: string;
  case_category_id: number;
  case_grade_id: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  client: Clients | undefined;
  case_grade: string;
  categoryName: string;
}
