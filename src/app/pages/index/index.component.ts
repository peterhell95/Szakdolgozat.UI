import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

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
  filter: string;
  minPrice: number;
  maxPrice: number;
  minRate: number;
  maxRate: number;
  // login-register
  showModalLogin: boolean;
  loginForm: FormGroup;
  submittedLogin = false;
  showModalRegister: boolean;
  registerForm: FormGroup;
  submittedRegister = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private searchService: SearchService,
    private router: Router,
    private formBuilder: FormBuilder
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngAfterViewInit() {
    this.getAllBooks();
  }


  public search(): void {
    if (this.filter === undefined && this.minPrice === undefined && this.maxPrice === undefined) {
      this.getAllBooks();
    } else if (this.filter !== undefined && this.minPrice === undefined && this.maxPrice === undefined) {
      this.searchByName(this.filter);
    } else if (this.filter === undefined && this.minPrice !== undefined && this.maxPrice !== undefined) {
      this.searchByPrice(this.minPrice, this.maxPrice);
    } else if (this.filter !== undefined && this.minPrice !== undefined && this.maxPrice !== undefined) {
      this.searchByAll(this.filter, this.minPrice, this.maxPrice);
    }
    this.filter = undefined;
    this.minPrice = undefined;
    this.maxPrice = undefined;

  }

  private getAllBooks(): any {
    this.searchService.getAllBook().subscribe((data) => {
      this.books = data;
      this.sortById();
    });
  }

  public searchByAll(filter: string, filter2: number, filter3: number): any {
    this.searchService.getFilteredBooks(filter, filter2, filter3).subscribe((data) => {
      this.books = data;
      this.sortById();
    });
  }

  public searchByPrice(filter: number, filter2: number): any {
    this.searchService.getFilteredBooksByPrice(filter, filter2).subscribe((data) => {
      this.books = data;
      this.sortById();
    });
  }

  public searchByName(filter: string): any {
    this.searchService.getFilteredBooksByName(filter).subscribe((data) => {
      this.books = data;
      this.sortById();
    });
  }

  public searchByRate(filter: number, filter2: number): any {
    this.searchService.getFilteredBooksByRate(filter, filter2).subscribe((data) => {
      this.books = data;
      this.sortById();
    });
  }

  public sortById(): void {
    this.books.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  public goToDevelop(): void {
    this.router.navigate(['/index-develop']);
  }

  public goToCart(): void {
    if (this.selectedBooks.length > 0) {
      const navigationExtras: NavigationExtras = {
        state: {
          selectedBooks: this.selectedBooks
        }
      };
      this.router.navigate(['/cart'], navigationExtras);
    } else {
      alert('Choose one book!');
    }
  }

  public clearCart(): void {
    if (this.selectedBooks.length === 0) {
      alert('Cart is emty!');
    } else {
      this.selectedBooks = [];
      this.ngAfterViewInit();
      alert('the cart has been cleared');
    }
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

  // Show-Hide Modal Check
  showLogin() {
    this.showModalLogin = true;
  }
  // Bootstrap Modal Close event
  hideLogin() {
    this.showModalLogin = false;
  }

  get f() { return this.loginForm.controls; }
  onSubmitLogin() {
    this.submittedLogin = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submittedLogin) {
      this.showModalLogin = false;
    }
  }

  // Show-Hide Modal Check
  showRegister() {
    this.showModalRegister = true;
  }
  // Bootstrap Modal Close event
  hideRegister() {
    this.showModalRegister = false;
  }

  get g() { return this.registerForm.controls; }
  onSubmitRegister() {
    this.submittedRegister = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submittedRegister) {
      this.showModalRegister = false;
    }
  }


}
