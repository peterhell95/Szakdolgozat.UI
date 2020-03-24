import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from './../model/book';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl: any = 'http://localhost:8083/search';
  public book: Book = new Book();
  constructor(private http: HttpClient) { }

  public getAllBook(): Observable<Book[]> {
    const url = this.baseUrl + '/list';
    return this.http.get<Book[]>(url);
  }

  public getFilteredBooksByName(filter: string): Observable<Book[]> {
    const url = this.baseUrl + '/searchByName?filter=' + filter;
    return this.http.get<Book[]>(url);
  }

  public getFilteredBooksByPrice(filter: number, filter2: number): Observable<Book[]> {
    const url = this.baseUrl + '/searchByPrice?filter=' + filter + '&filter2=' + filter2;
    return this.http.get<Book[]>(url);
  }

  public getFilteredBooksByRate(filter: number, filter2: number): Observable<Book[]> {
    const url = this.baseUrl + '/searchByRate?filter=' + filter + '&filter2=' + filter2;
    return this.http.get<Book[]>(url);
  }

  public getFilteredBooks(filter: string, filter2: number, filter3: number): Observable<Book[]> {
    const url = this.baseUrl + '/searchByAll?filter=' + filter + '&filter2=' + filter2 + '&filter3=' + filter3;
    return this.http.get<Book[]>(url);
  }
}
