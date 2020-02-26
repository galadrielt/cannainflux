import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { EntryEditComponent } from './entry-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EntryEditGuard implements CanDeactivate<EntryEditComponent> {
  canDeactivate(component: EntryEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.entryForm.dirty) {
      const entryName = component.entryForm.get('entryName').value || 'New Entry';
      return confirm(`Navigate away and lose all changes to ${entryName}?`);
    }
    return true;
  }
}
