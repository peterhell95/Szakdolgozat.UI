import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Rate } from '../model/rate';
import { Book } from './../model/book';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private baseUrl: any = 'http://localhost:8082/rate';
  public book: Book = new Book();
  constructor(private http: HttpClient) { }

  public rateBook(id, rate): Observable<Book> {
    const url = this.baseUrl + '/' + id + '/rate/' + rate;
    return this.http.put<Book>(url, {});
  }

  public addRate(rate: Rate): Observable<Rate> {
    const url = this.baseUrl + '/add';
    return this.http.post<Rate>(url, rate);
  }

  public getRate(filter: number): Observable<Rate[]> {
    const url = this.baseUrl + '/list/' + filter;
    return this.http.get<Rate[]>(url);
  }
}

