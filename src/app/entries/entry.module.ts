import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EntryData } from './entry-data';
import { EntryComponent } from './entry-list.component';
import { EntryEditComponent } from './entry-edit.component';
import { EntryDetailComponent } from './entry-detail.component';

import { EntryEditGuard } from './entry-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(EntryData),
    RouterModule.forChild([
      { path: 'entries', component: EntryComponent },
      { path: 'entries/:id', component: EntryDetailComponent },
      {
        path: 'entries/:id/edit',
        canDeactivate: [EntryEditGuard],
        component: EntryEditComponent
      }
    ])
  ],
  declarations: [
    EntryComponent,
    EntryEditComponent,
    EntryDetailComponent
  ]
})
export class EntryModule { }
