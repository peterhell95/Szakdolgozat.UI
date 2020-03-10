import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private route: Router,
    private bookService: BookService
  ) { }

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
    this.route.navigate(['/rate']);
  }

  public goToDevelop(): void {
    this.route.navigate(['/index-develop']);
  }

  public goToCart(): void {
    // TODO
    // this.bookService.setter(this.selectedBooks);
    this.route.navigate(['/cart']);
  }

}
