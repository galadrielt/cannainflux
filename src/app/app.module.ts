import '../polyfills';

// Angular Core
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Google Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Ngrx Import Modules
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Compoenents
import { AppComponent } from './app.component';
import { BracketsComponent } from './brackets/brackets.component';
// import { PoolComponent } from './pools/pool-list.component';
import { ToteComponent } from './tote/tote.component';
import { WelcomeComponent } from './home/welcome.component';

// Modules
import { BracketsModule } from './brackets/brackets.module';
import { DataModule } from './data/data.module';
import { EntryModule } from './entries/entry.module';
import { OrderModule } from './orders/order.module';
import { MatchesModule } from './matches/matches.module';
import { PoolModule } from './pools/pool.module';
import { SportModule } from './sports/sport.module';
import { TeamModule } from './teams/team.module';
import { UserModule } from './users/users.module';
import { WrestlerModule } from './wrestlers/wrestler.module';


// Angular Material Modules
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { DemoMaterialModule } from './material-module'; // All of them in another module too much overhead


// Ngx-Bootstrap Angular Material Modules
// import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BracketsComponent,
    ToteComponent,
//    PoolComponent,
  ],
  exports: [
    MatTooltipModule,
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'matMadness',
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Angular Material
    MatFormFieldModule,
    MatDatepickerModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    //DemoMaterialModule,

    // Ngx-bootstrap
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatColorPickerModule,
    // NgxMatFileInputModule,  // Issue with Ivy???

    // Google Firestore
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ], { enableTracing: false }), // true if you want to track it
    BracketsModule,
    WrestlerModule,
    PoolModule,
    TeamModule,
    SportModule,
    UserModule,
    DataModule,
    EntryModule,
    OrderModule,
    MatchesModule,
    BrowserAnimationsModule,

  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
