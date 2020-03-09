import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';

import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  public book: Book;
  constructor(
    private route: Router,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.book = this.bookService.getter();
  }

  public goToList(): void {
    this.route.navigate(['/']);
  }

  public addBook(): void {
    if (this.book.id === undefined) {
      this.bookService.addBook(this.book).subscribe((data) => {
        this.book = data;
        alert('Add Book Success:\n Author:' + this.book.author + '\nTitle: ' + this.book.title);
        this.route.navigate(['/']);
      });
    } else {
      this.bookService.updateBook(this.book).subscribe((data) => {
        this.book = data;
        alert('Update Book Success:\n Author:' + this.book.author + '\nTitle: ' + this.book.title);
        this.route.navigate(['/']);
      });
    }
  }

}