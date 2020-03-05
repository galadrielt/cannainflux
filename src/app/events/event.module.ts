import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'

// Shared Module common functions
import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

// Component Libraries
import { EventData } from './event-data';
import { EventListComponent } from './event-list.component';
import { EventDetailComponent } from './event-detail.component';
import { EventEditComponent } from './event-edit.component';
import { EventEditGuard } from './event-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    InMemoryWebApiModule.forRoot(EventData),
    RouterModule.forChild([
      { path: 'events', component: EventListComponent },
      { path: 'events/:id', component: EventDetailComponent },
      {
        path: 'events/:id/edit',
        canDeactivate: [EventEditGuard],
        component: EventEditComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    EventListComponent,
    EventDetailComponent,
    EventEditComponent
  ]
})
export class EventModule { }
