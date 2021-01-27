import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  pageTitle = 'Order Details';
  errorMessage = '';
  order: Order | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log(param);
    if (param) {
      const id = +param;
      this.getOrder(id);
      console.log(id);
    }
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe({
      next: order => this.order = order,
      error: err => this.errorMessage = err
    });
    //console.log(order);
  }

  onBack(): void {
    this.router.navigate(['/orders']);
  }

}
