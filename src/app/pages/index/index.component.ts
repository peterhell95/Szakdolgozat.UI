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
        if(a.id > b.id) {
          return 1;
        } else if(a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
    });
    //this.book.sort((a,b) => a.id.localeCompare(b.id));
  }

  public rateBook(book: Book): void {
    this.bookService.setter(book);
    this.route.navigate(['/rate']);
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      alert('Delete Book Success');
      this.getAllBooks();
    });
  }

  public goToAddBook(): void {
    const book: Book = new Book();
    this.bookService.setter(book);
    this.route.navigate(['/add']);
  }

  public goToUpdateBook(book: Book): void {
    this.bookService.setter(book);
    this.route.navigate(['/add']);
  }

}