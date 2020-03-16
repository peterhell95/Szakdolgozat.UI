import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { RateService } from 'src/app/services/rate.service';


@Component({
  selector: 'app-rate-book',
  templateUrl: './rate-book.component.html',
  styleUrls: ['./rate-book.component.css']
})
export class RateBookComponent implements OnInit {

  public book: Book;
  public rate: number;
  constructor(
    private route: Router,
    private bookService: BookService,
    private rateService: RateService
  ) { }

  ngOnInit() {
    this.book = this.bookService.getter();
    this.rate = this.book.rate / this.book.ratecount;
  }

  public goToList(): void {
    this.route.navigate(['/']);
  }

  public rateBook(): void {
    this.bookService.rateBook(this.book.id, this.rate).subscribe((data) => {
      this.book = data;
      alert('Rate Book Success');
      this.route.navigate(['/']);
    });
  }
  public rateBook2(): void {
    this.rateService.rateBook(this.book.id, this.rate).subscribe((data) => {
      this.book = data;
      alert('Rate Book Success');
      this.route.navigate(['/']);
    });
  }
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rate = $event.newValue;
  }
}
