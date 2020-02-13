import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { PoolEditComponent } from './pool-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PoolEditGuard implements CanDeactivate<PoolEditComponent> {
  canDeactivate(component: PoolEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.poolForm.dirty) {
      const poolName = component.poolForm.get('poolName').value || 'New Pool';
      return confirm(`Navigate away and lose all changes to ${poolName}?`);
    }
    return true;
  }
}
