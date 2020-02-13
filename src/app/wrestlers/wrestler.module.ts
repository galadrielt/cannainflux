import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WrestlerData } from './wrestler-data';
import { WrestlerComponent } from './wrestler-list.component';
import { WrestlerEditComponent } from './wrestler-edit.component';
import { WrestlerDetailComponent } from './wrestler-detail.component';

import { WrestlerEditGuard } from './wrestler-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(WrestlerData),
    RouterModule.forChild([
      { path: 'wrestlers', component: WrestlerComponent },
      { path: 'wrestlers/:id', component: WrestlerDetailComponent },
      {
        path: 'wrestlers/:id/edit',
        canDeactivate: [WrestlerEditGuard],
        component: WrestlerEditComponent
      }
    ])
  ],
  declarations: [
    WrestlerComponent,
    WrestlerEditComponent,
    WrestlerDetailComponent
  ]
})
export class WrestlerModule { }
