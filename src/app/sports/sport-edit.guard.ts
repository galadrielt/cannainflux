import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SportEditComponent } from './sport-edit.component';

@Injectable({
  providedIn: 'root'
})
export class SportEditGuard implements CanDeactivate<SportEditComponent> {
  canDeactivate(component: SportEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.sportForm.dirty) {
      const sportName = component.sportForm.get('sportName').value || 'New Sport';
      return confirm(`Navigate away and lose all changes to ${sportName}?`);
    }
    return true;
  }
}
