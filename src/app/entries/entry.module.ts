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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    InMemoryWebApiModule.forRoot(EntryData),
    RouterModule.forChild([
      { path: 'entries/:poolsId', component: EntryComponent },
      { path: 'entries/:poolsId/:id', component: EntryDetailComponent },
      {
        path: 'entries/:poolsId/:id/edit',
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
