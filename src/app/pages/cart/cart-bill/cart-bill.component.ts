import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Order } from 'src/app/model/order';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-bill',
  templateUrl: './cart-bill.component.html',
  styleUrls: ['./cart-bill.component.css']
})
export class CartBillComponent implements OnInit {

  public purchasedOrder: Order;
  public id: number;
  public selectedBooks: Array<Book> = [];//= [{ id: 140, title: 'asd', author: 'asd', rate: 5, ratecount: 1, price: 1200 }];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit() {
    this.orderService.getter();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'));
        this.getBill(this.id);
      }
    );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.getBill(this.id);
  }

  public getBill(id: number): void {
    this.orderService.getBill(id).subscribe((data) => {
      this.purchasedOrder = data;
    });
  }
  public rateBook(book: Book): void {
    this.bookService.setter(book);
    this.router.navigate(['/rate']);
  }

  public backToHome(): void {
    this.router.navigate(['/']);
  }
}
