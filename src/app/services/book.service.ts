import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from './../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: any = 'http://localhost:8080/book';
  public book: Book = new Book();
  constructor(private http: HttpClient) { }

  public getAllBook(): Observable<Book[]> {
    const url = this.baseUrl + '/list';
    return this.http.get<Book[]>(url);
  }

  public addBook(book: Book): Observable<Book> {
    const url = this.baseUrl + '/add';
    return this.http.post<Book>(url, book);
  }

  public updateBook(book: Book): Observable<Book> {
    const url = this.baseUrl + '/update';
    return this.http.put<Book>(url, book);
  }

  public deleteBook(id: number): Observable<Book> {
    const url = this.baseUrl + '/delete/' + id;
    return this.http.delete<Book>(url);
  }
  public rateBook(id, rate): Observable<Book> {
    const url = this.baseUrl + '/' + id + '/rate/' + rate;
    return this.http.put<Book>(url, {});
  }


  // Return assigned variable book
  getter() {
    return this.book;
  }

  // Set Value into variable book
  setter(book: Book) {
    this.book = book;
  }
}
