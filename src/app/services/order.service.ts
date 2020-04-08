import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: any = 'http://172.17.45.227:31278/api/order';
  public order: Order;
  constructor(private http: HttpClient) { }

  public getAllOrder(): Observable<Order[]> {
    const url = this.baseUrl + '/list';
    return this.http.get<Order[]>(url);
  }

  public getBill(id: number): Observable<Order> {
    const url = this.baseUrl + '/list/' + id;
    return this.http.get<Order>(url);
  }

  public addOrder(order: Order): Observable<Order> {
    const url = this.baseUrl + '/add';
    return this.http.post<Order>(url, order);
  }

  getter() {
    return this.order;
  }

  // Set Value into variable book
  setter(order: Order) {
    this.order = order;
  }
}
