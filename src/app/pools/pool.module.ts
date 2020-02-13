import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { PoolComponent } from './pool-list.component';
import { PoolDetailComponent } from './pool-detail.component';
import { PoolEditGuard } from './pool-edit.guard';
import { PoolEditComponent } from './pool-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PoolData } from './pool-data';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NoopAnimationsModule,
    //MatDatepickerModule,
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
    //MatDatepickerModule
  ]
})
export class PoolModule { }
