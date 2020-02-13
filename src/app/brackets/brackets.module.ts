import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BracketsComponent } from './brackets.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'brackets', component: BracketsComponent }
  
    ])
  ],
  declarations: []
})

export class BracketsModule { }
