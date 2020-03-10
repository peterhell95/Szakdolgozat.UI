import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ng-starrating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './pages/cart/cart.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { IndexDevelopComponent } from './pages/index-develop/index-develop.component';
import { IndexComponent } from './pages/index/index.component';
import { RateBookComponent } from './pages/rate-book/rate-book/rate-book.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexDevelopComponent,
    CreateBookComponent,
    RateBookComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
