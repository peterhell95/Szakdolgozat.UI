import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Order } from 'src/app/model/order';
import { Rate } from 'src/app/model/rate';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-cart-bill',
  templateUrl: './cart-bill.component.html',
  styleUrls: ['./cart-bill.component.css']
})
export class CartBillComponent implements OnInit {

  public purchasedOrder: Order;
  public purchasedOrders: Array<Order>;
  public id: number;
  public updateid: number;
  public rateList: Array<Rate> = [];
  public selectedBooks: Array<Book> = [];
  public ratedBooks: Array<Book> = [];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private bookService: BookService,
    private rateService: RateService,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.updateid = this.router.getCurrentNavigation().extras.state.id;
      }
    });
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
    this.getRate(this.id);
  }

  public ciklus(): void {
    this.rateList.forEach(element => {
      if (element.bookid === this.updateid) {
        this.rateService.update(element.id).subscribe((data) => {
          location.reload();
        });
      }
    });
    this.rateList.forEach(element => {
      this.getBook2(element.bookid);
      if (element.rated === false) {
        this.getBook(element.bookid);
      }
    });
  }

  public getBill(id: number): void {
    this.orderService.getBill(id).subscribe((data) => {
      this.purchasedOrder = data;
    });
  }
  public getRate(id: number): void {
    this.rateService.getRate(id).subscribe((data) => {
      this.rateList = data;
      this.ciklus();
    });

  }

  public getBook(id: number): void {
    this.selectedBooks = [];
    this.rateService.getBook(id).subscribe((data) => {
      this.selectedBooks.push(data);
      this.selectedBooks.sort((a, b) => {
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

  public getBook2(id: number): void {
    this.rateService.getBook(id).subscribe((data) => {
      this.ratedBooks.push(data);
      this.ratedBooks.sort((a, b) => {
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

  public rateBook(book: Book): void {
    this.bookService.setter(book);
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.id
      }
    };
    this.router.navigate(['/rate'], navigationExtras);
  }

  public backToHome(): void {
    this.router.navigate(['/']);
  }
}
