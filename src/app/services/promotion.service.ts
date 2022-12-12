import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]> {
    // Simulate server latency with 2 second delay
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    // Simulate server latency with 2 second delay
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // Simulate server latency with 2 second delay
      return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }

  constructor() { }
}
