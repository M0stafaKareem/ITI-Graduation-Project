import { CountryService } from '../services/country.service';
import { ClientCategory } from './client.category';
import { Country } from './country.model';

export interface Clients {
  id?: number;
  name: string;
  country_id: bigint;
  state_id: number;
  city_id: number;
  role: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  client_category_id: number;
  category: ClientCategory | undefined;
  country: Country;
  city: string;
}
