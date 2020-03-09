import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateBookComponent } from './pages/create-book/create-book.component';
import { IndexComponent } from './pages/index/index.component';
import { RateBookComponent } from './pages/rate-book/rate-book/rate-book.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'add', component: CreateBookComponent },
  { path: 'rate', component: RateBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }