import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Delivery } from 'src/app/model/delivery';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  form: FormGroup;
  public selectedBooks: Array<Book> = [];
  public orderBook: Array<Order> = [];
  public totalPrice = 0;
  selectedDelivery = 'Choose One';
  comment = '';
  deliverys: Delivery[] = [
    { value: 'One-Day Delivery', viewValue: 'One-Day Delivery' },
    { value: 'Item Express Delivery', viewValue: 'Item Express Delivery' },
    { value: 'Item Evening Delivery', viewValue: 'Item Evening Delivery' }
  ];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router, ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedBooks = this.router.getCurrentNavigation().extras.state.selectedBooks;
      }
    });
  }

  ngOnInit(): void {
    this.calculatePrice();
  }

  ngOnChanges(): void {
  }

  public deleteBook(id: number): void {
    const index = this.selectedBooks.findIndex((i) => i.id === id);
    if (index > -1) {
      this.selectedBooks.splice(index, 1);
    }
    this.calculatePrice();
  }

  public goBack(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        selectedBooks: this.selectedBooks
      }
    };
    this.router.navigate(['/'], navigationExtras);
  }
  calculatePrice(): void {
    this.totalPrice = 0;
    for (let i = 0, len = this.selectedBooks.length; i < len; i++) {
      this.totalPrice += this.selectedBooks[i].price;
    }
  }

  public buy(): void {
    let order: Order = new Order(this.comment, this.selectedDelivery, this.totalPrice, this.selectedBooks);
    console.log(order);
    // this.orderService.setter(order);
    this.orderService.addOrder(order).subscribe((data) => {
      order = data;
    });
    alert('the purchase was successful');
    this.router.navigate(['/']);
    this.selectedBooks = [];
  }
  public clear(): void {
    alert('the cart has been cleared');
    this.router.navigate(['/']);
    this.selectedBooks = [];
  }
}
