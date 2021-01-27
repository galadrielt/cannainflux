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
import { OrderData } from './order-data';
import { OrderListComponent } from './order-list.component';
import { OrderDetailComponent } from './order-detail.component';
import { OrderEditComponent } from './order-edit.component';
import { OrderEditGuard } from './order-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    InMemoryWebApiModule.forRoot(OrderData),
    RouterModule.forChild([
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
      {
        path: 'orders/:id/edit',
        canDeactivate: [OrderEditGuard],
        component: OrderEditComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderEditComponent
  ]
})
export class OrderModule { }
