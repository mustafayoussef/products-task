import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:3000/orders';
  private addOrderSubject = new Subject<void>();
  addOrder$ = this.addOrderSubject.asObservable();

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.ordersUrl}/${orderId}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order);
  }

  triggerAddOrder() {
    this.addOrderSubject.next();
  }
}
