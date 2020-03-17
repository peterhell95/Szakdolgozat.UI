import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public id: number;
  constructor(
    private bookService: BookService,
    private rateService: RateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {
    this.book = this.bookService.getter();
    this.rate = this.book.rate / this.book.ratecount;
  }

  public goToList(): void {
    this.router.navigate(['/']);
  }

  public rateBook(): void {
    this.bookService.rateBook(this.book.id, this.rate).subscribe((data) => {
      this.book = data;
      console.log(this.id);
      alert('Rate Book Success');
      this.router.navigate(['/']);
    });
  }
  public rateBook2(): void {
    this.rateService.rateBook(this.book.id, this.rate).subscribe((data) => {
      this.book = data;
      alert('Rate Book Success');
      this.router.navigate(['/']);
    });
  }
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rate = $event.newValue;
  }
}
