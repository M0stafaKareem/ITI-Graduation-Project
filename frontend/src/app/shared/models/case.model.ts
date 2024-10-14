import { CaseGrade } from './case.grade.model';
import { Clients } from './clients.model';
import { Court } from './court.model';
import { Lawyers } from './lawyers.model';
import { Session } from './session.model';

export interface Case {
  id?: number;
  case_name: string;
  case_date: string;
  first_session_date: string;
  case_category_id: number;
  case_grade_id: number;
  client_id: number;
  created_at?: string;
  updated_at?: string;
  client?: Clients | undefined;
  case_grade?: CaseGrade;
  categoryName?: string;
  court_id: number;
  court?: Court;
  lawyer: Lawyers;
  oppositeLawyer: Lawyers;
  lawyer_id: number;
  opposing_lawyer_id: number;
  session_id: number;
  sessions: Session[];
  status: string;
}
