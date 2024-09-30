import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Lawyers } from '../../../shared/models/lawyers.model';
import { LawyersService } from '../../../shared/services/lawyers.service';

@Injectable({
  providedIn: 'root',
})
export class OppositeLawyersResolver implements Resolve<Lawyers[]> {
  constructor(private lawyerService: LawyersService) {}

  resolve(): Observable<Lawyers[]> {
    return this.lawyerService.getOppositeLawyers();
  }
}
