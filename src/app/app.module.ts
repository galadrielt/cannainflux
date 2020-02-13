//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';import { HttpClientModule } from '@angular/common/http';
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
import { MatchesModule } from './matches/matches.module';
import { SportModule } from './sports/sport.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'
import { DemoMaterialModule } from './material-module';



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
    EventModule,
    MatchesModule,
    MatChipsModule,
    MatIconModule,
    DemoMaterialModule


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
