//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { BracketsComponent } from './brackets/brackets.component';
import { ToteComponent } from './tote/tote.component';

//Modules
import { EventModule } from './events/event.module';
import { UserModule } from './users/users.module';
import { TeamModule } from './teams/team.module';
import { BracketsModule } from './brackets/brackets.module';
import { WrestlerModule } from './wrestlers/wrestler.module';
import { PoolModule } from './pools/pool.module';
import { DataModule } from './data/data.module';
import { MatchesModule } from './matches/matches.module';
import { SportModule } from './sports/sport.module';
import { EntryModule } from './entries/entry.module';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BracketsComponent,
    ToteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ], { enableTracing: false }), //true if you want to track it
    BracketsModule,
    WrestlerModule,
    PoolModule,
    TeamModule,
    SportModule,
    UserModule,
    DataModule,
    EntryModule,
    EventModule,
    MatchesModule,
    DemoMaterialModule,
    BrowserAnimationsModule


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
