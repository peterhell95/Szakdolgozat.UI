import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Book } from './../../model/book';
import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  public books: Array<Book>;
  public checked = false;
  public selectedBooks: Array<Book> = [];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedBooks = this.router.getCurrentNavigation().extras.state.selectedBooks;
      }
    });
  }

  ngOnInit() {
    this.books = [];
    this.bookService.getter();
  }

  ngAfterViewInit() {
    this.getAllBooks();
  }

  private getAllBooks(): any {
    this.bookService.getAllBook().subscribe((data) => {
      this.books = data;
      this.books.sort((a, b) => {
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
    this.router.navigate(['/rate']);
  }

  public goToDevelop(): void {
    this.router.navigate(['/index-develop']);
  }

  public goToCart(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        selectedBooks: this.selectedBooks
      }
    };
    this.router.navigate(['/cart'], navigationExtras);
  }
  public clearCart(): void {
    this.selectedBooks = [];
    this.ngAfterViewInit();
  }

  public checkBook(event, book: Book): void {
    if (event.checked) {
      this.selectedBooks.push(book);
    } else {
      const index = this.selectedBooks.indexOf(book);
      if (index > -1) {
        this.selectedBooks.splice(index, 1);
      }
    }
  }

}
