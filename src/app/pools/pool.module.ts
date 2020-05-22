import { MatTooltipModule } from '@angular/material/tooltip';
// Angular core
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';

// Shared
import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { PoolComponent } from './pool-list.component';
import { PoolDetailComponent } from './pool-detail.component';
import { PoolEditGuard } from './pool-edit.guard';
import { PoolEditComponent } from './pool-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PoolData } from './pool-data';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// NGX-Bootstrap Datepicker (remove eventually and replace with Angular Material datepicker & Timepicker?)
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

// Angular Material @angular/material https://material.angular.io
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatSelectModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NoopAnimationsModule,
    InMemoryWebApiModule.forRoot(PoolData),
    RouterModule.forChild([
      { path: 'pools', component: PoolComponent },
      { path: 'pools/:id', component: PoolDetailComponent },
      {
        path: 'pools/:id/edit',
        canDeactivate: [PoolEditGuard],
        component: PoolEditComponent
      }
    ])
  ],
  declarations: [
    PoolComponent,
    PoolEditComponent,
    PoolDetailComponent
  ],
  exports: [
    FormsModule,
  ]
})
export class PoolModule { }
