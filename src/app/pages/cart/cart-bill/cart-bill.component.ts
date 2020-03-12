import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-bill',
  templateUrl: './cart-bill.component.html',
  styleUrls: ['./cart-bill.component.css']
})
export class CartBillComponent implements OnInit {

  public purchasedBook: Order;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router, ) {
  }

  ngOnInit() {
    this.orderService.getter();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'));
        this.getBill(this.id);
      }
    );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.getBill(this.id);
  }

  public getBill(id: number): void {
    this.orderService.getBill(id).subscribe((data) => {
      this.purchasedBook = data;
    });
  }
  public backToHome(): void {
    this.router.navigate(['/']);
  }
}
