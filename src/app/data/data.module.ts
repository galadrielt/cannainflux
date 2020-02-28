import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { DataComponent } from './data.component';
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
    RouterModule.forChild([
      { path: 'data', component: DataComponent }
    ])
  ],
  declarations: [
    DataComponent,
  ],
  exports: []
})
export class DataModule { }
