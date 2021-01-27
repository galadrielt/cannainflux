import { Component, OnInit } from '@angular/core';

import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  pageTitle = 'History of orders';
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.orders;
  }

  filteredOrders: Order[] = [];
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  performFilter(filterBy: string): Order[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.orders.filter((order: Order) =>
      order.orderName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.orders = orders;
        this.filteredOrders = this.orders;
      },
      error: err => this.errorMessage = err
    });
  }
}
