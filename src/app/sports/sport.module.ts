import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SportData } from './sport-data';
import { SportComponent } from './sport-list.component';
import { SportEditComponent } from './sport-edit.component';
import { SportDetailComponent } from './sport-detail.component';

import { SportEditGuard } from './sport-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(SportData),
    StoreModule.forFeature('sports', {}),
    RouterModule.forChild([
      { path: 'sports', component: SportComponent },
      { path: 'sports/:id', component: SportDetailComponent },
      {
        path: 'sports/:id/edit',
        canDeactivate: [SportEditGuard],
        component: SportEditComponent
      }
    ])
  ],
  declarations: [
    SportComponent,
    SportEditComponent,
    SportDetailComponent
  ]
})
export class SportModule { }
