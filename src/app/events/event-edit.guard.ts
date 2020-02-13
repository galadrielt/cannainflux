import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { EventEditComponent } from './event-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EventEditGuard implements CanDeactivate<EventEditComponent> {
  canDeactivate(component: EventEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.eventForm.dirty) {
      const eventName = component.eventForm.get('eventName').value || 'New Event';
      return confirm(`Navigate away and lose all changes to ${eventName}?`);
    }
    return true;
  }
}
