import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TeamData } from './team-data';
import { TeamComponent } from './team-list.component';
import { TeamEditComponent } from './team-edit.component';
import { TeamDetailComponent } from './team-detail.component';

import { TeamEditGuard } from './team-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(TeamData),
    StoreModule.forFeature('teams', {}),
    RouterModule.forChild([
      { path: 'teams', component: TeamComponent },
      { path: 'teams/:id', component: TeamDetailComponent },
      {
        path: 'teams/:id/edit',
        canDeactivate: [TeamEditGuard],
        component: TeamEditComponent
      }
    ])
  ],
  declarations: [
    TeamComponent,
    TeamEditComponent,
    TeamDetailComponent
  ]
})
export class TeamModule { }
