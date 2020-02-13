import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MatchesComponent } from './matches.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'matches', component: MatchesComponent }
    ])
  ],
  declarations: [
    MatchesComponent
  ]
})
export class MatchesModule { }
