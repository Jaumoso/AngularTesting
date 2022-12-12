import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // Simulate server latency with 2 second delay
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    // Simulate server latency with 2 second delay
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    // Simulate server latency with 2 second delay
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
