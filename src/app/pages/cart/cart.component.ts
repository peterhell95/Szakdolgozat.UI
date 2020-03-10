import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public selectedBooks: Array<Book> = [];
  public totalPrice = 0;
  constructor(
    private route: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // this.selectedBooks.forEach(function (value) {
    //   this.totalPrice += value.price;  });
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      alert('Delete Book Success');
      // this.getAllBooks();
    });
  }

  public goBack(): void {
    this.route.navigate(['/']);
  }
}
