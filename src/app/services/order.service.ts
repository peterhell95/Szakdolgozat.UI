import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: any = 'http://localhost:8081/order';
  public book: Order;
  constructor(private http: HttpClient) { }

  public getAllOrder(): Observable<Order[]> {
    const url = this.baseUrl + '/list';
    return this.http.get<Order[]>(url);
  }

  public addOrder(order: Order): Observable<Order> {
    const url = this.baseUrl + '/add';
    return this.http.post<Order>(url, order);
  }

  getter() {
    return this.book;
  }

  // Set Value into variable book
  setter(book: Order) {
    this.book = book;
  }
}
