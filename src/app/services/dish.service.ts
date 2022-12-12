import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, pipe, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
      // Simulate server latency with 2 second delay
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
       // Simulate server latency with 2 second delay
      return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
      // Simulate server latency with 2 second delay
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

}




// EXAMPLE OF PROMISES

/* getDishes(): Promise<Dish[]> {
  return new Promise( resolve => {
      // Simulate server latency with 2 second delay
    setTimeout(() => resolve(DISHES), 2000);
  });
}

getDish(id: string): Promise<Dish> {
  return new Promise( resolve => {
      // Simulate server latency with 2 second delay
    setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  });
}

getFeaturedDish(): Promise<Dish> {
  return new Promise( resolve => {
    // Simulate server latency with 2 second delay
  setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  });
}
 */
