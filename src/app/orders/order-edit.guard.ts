import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderEditComponent } from './order-edit.component';

@Injectable({
  providedIn: 'root'
})
export class OrderEditGuard implements CanDeactivate<OrderEditComponent> {
  canDeactivate(component: OrderEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.orderForm.dirty) {
      const orderName = component.orderForm.get('orderName').value || 'New Event';
      return confirm(`Navigate away and lose all changes to ${orderName}?`);
    }
    return true;
  }
}
