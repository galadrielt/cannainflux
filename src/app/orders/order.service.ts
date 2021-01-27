import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';

import { Order } from './order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private ordersUrl = 'api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        //tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getOrderNames(): Observable<Order[]> {
    return this.http.get<any[]>(this.ordersUrl)
      .pipe(
        map(data=>data.map(obj=>obj.orderName)),
        catchError(this.handleError)
        );
  }


  getOrder(id: number): Observable<Order> {
    if (id === 0) {
      return of(this.initializeOrder());
    }
    const url = `${this.ordersUrl}/${id}`;
    console.log(url);
    return this.http.get<Order>(url)
      .pipe(
        delay(250), //pretend time
        tap(data => console.log('getOrder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    order.id = null;
    return this.http.post<Order>(this.ordersUrl, order, { headers })
      .pipe(
        tap(data => console.log('createOrder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteOrder(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ordersUrl}/${id}`;
    return this.http.delete<Order>(url, { headers })
      .pipe(
        tap(data => console.log('deleteOrder: ' + id)),
        catchError(this.handleError)
      );
  }

  updateOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ordersUrl}/${order.id}`;
    return this.http.put<Order>(url, order, { headers })
      .pipe(
        tap(() => console.log('UpdateOrder: ' + order.id)),
        tap(() => console.log('UPDATE: ' + JSON.stringify(order))),
        // Return the order on an update
        map(() => order),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeOrder(): Order {
    // Return an initialized object
    return {
      id: 0,
      orderName: null,
      orderLocationName: null,
      orderLocationAddress: null,
      orderLocationCity: null,
      orderLocationState: null,
      orderStartDate: null,
      orderEndDate: null,
      orderStartTime: null,
      orderEndTime: null,
      orderUrl: null,
      orderImageUrl: null,
      orderSport: 'Wrestling',
      orderDivisions: [' '],
      orderLevels: [' '],
      orderBreakdowns: [['']],
      orderType: 'Tournament',
      orderNumOfSeeding: null,
      orderOrganizerFullName: null,
      orderOrganizerPhone: null,
      orderBracketType: null,
      orderBracketNumOfParticipantsPerClass: null,
      orderPlaceWinners: null,
      orderExtraInstructions: null
    };
  }
}
