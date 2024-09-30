import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Court } from '../../shared/models/court.model';
import { CourtService } from '../../shared/services/court.service';

@Injectable({
  providedIn: 'root',
})
export class CourtsResolver implements Resolve<Court[]> {
  constructor(private courtService: CourtService) {}

  resolve(): Observable<Court[]> {
    return this.courtService.getCourts();
  }
}
