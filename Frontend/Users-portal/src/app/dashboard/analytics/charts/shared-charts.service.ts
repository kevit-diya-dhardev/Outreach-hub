import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedChartsService {
  private filterSubject = new Subject<{ startDate: string; endDate: string }>();
  public filter$ = this.filterSubject.asObservable();

  applyFilter(startDate: string, endDate: string) {
    this.filterSubject.next({ startDate, endDate });
  }
}
