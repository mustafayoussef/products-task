import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:3000/orders';

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
}
