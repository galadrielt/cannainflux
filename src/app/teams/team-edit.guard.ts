import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { TeamEditComponent } from './team-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TeamEditGuard implements CanDeactivate<TeamEditComponent> {
  canDeactivate(component: TeamEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.teamForm.dirty) {
      const teamName = component.teamForm.get('teamName').value || 'New Team';
      return confirm(`Navigate away and lose all changes to ${teamName}?`);
    }
    return true;
  }
}
