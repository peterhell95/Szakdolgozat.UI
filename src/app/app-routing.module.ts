import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartBillComponent } from './pages/cart/cart-bill/cart-bill.component';
import { CartComponent } from './pages/cart/cart.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { IndexDevelopComponent } from './pages/index-develop/index-develop.component';
import { OrdersComponent } from './pages/index-develop/orders/orders.component';
import { IndexComponent } from './pages/index/index.component';
import { RateBookComponent } from './pages/rate-book/rate-book/rate-book.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'add', component: CreateBookComponent },
  { path: 'rate', component: RateBookComponent },
  { path: 'index-develop', component: IndexDevelopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart-bill/:id', component: CartBillComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
