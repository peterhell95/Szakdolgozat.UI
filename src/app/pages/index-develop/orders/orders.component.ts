import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  public purchasedBooks: Array<Order> = [];

  constructor(
    private orderService: OrderService,
    private router: Router, ) {
  }

  ngOnInit() {
    this.orderService.getter();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.getAllOrders();
  }

  private getAllOrders(): any {
    this.orderService.getAllOrder().subscribe((data) => {
      this.purchasedBooks = data;
      this.purchasedBooks.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
    });
  }

  public backToDevelop(): void {
    this.router.navigate(['/index-develop']);
  }
}
