import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { WrestlerEditComponent } from './wrestler-edit.component';

@Injectable({
  providedIn: 'root'
})
export class WrestlerEditGuard implements CanDeactivate<WrestlerEditComponent> {
  canDeactivate(component: WrestlerEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.wrestlerForm.dirty) {
      const wrestlerLastName = component.wrestlerForm.get('wrestlerLastName').value || 'New Wrestler';
      return confirm(`Navigate away and lose all changes to ${wrestlerLastName}?`);
    }
    return true;
  }
}
