import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: any = 'http://localhost:8081/order';
  public book: Order;
  constructor(private http: HttpClient) { }


  getter() {
    return this.book;
  }

  // Set Value into variable book
  setter(book: Order) {
    this.book = book;
  }
}
