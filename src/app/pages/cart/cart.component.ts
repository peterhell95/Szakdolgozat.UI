import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  public selectedBooks: Array<Book> = [];
  public totalPrice = 0;
  constructor(
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
    alert('the purchase was successful');
    this.router.navigate(['/']);
    this.selectedBooks = [];
  }
}
