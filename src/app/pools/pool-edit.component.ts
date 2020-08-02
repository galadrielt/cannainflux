import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { Pool } from './pool';
import { PoolService } from './pool.service';

import { GenericValidator } from '../shared/generic-validator';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { EventService } from '../events/event.service';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Event } from '../events/event';


export interface TotalsStore {
  totalPools: number;
}

@Component({
  templateUrl: './pool-edit.component.html',
  styleUrls: ['../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css', 'pool-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PoolEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('picker') picker: any;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  files  = [];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  // CLEAN UP ABOVE DONT NEED EVERYTHING


  pageTitle = 'Edit a pool';
  errorMessage: string;
  poolForm: FormGroup;
  poolsId: number;
  pTypes: Array<string> = ['Pick Top 16 Seeds', 'Pick Top 10 Seeds'];
  events: any[];
  eventsAndId: Event[] = [];
  eventLinkId: any;
  indexRef: AngularFirestoreCollection<TotalsStore>;
  totals$: Observable<TotalsStore[]>;
  index$: Observable<any[]>;
  autoindex: number;
  autoid: string;

  // Fake Test Data as to not have to fill out the form again and again using button at bottom of html
  testPool: Pool = {
    id: 9999,
    poolName: 'BayArea Brawlers',
    poolDeadlineDate: 'January 25, 2018',
    poolImageUrlBackground: 'assets/images/male.png',
    poolImageUrlMain: 'assets/images/male.png',
    poolType: 'Pick Top 16 Seeds',
    poolPaymentBreakdown: '70,25,5',
    poolEntryAmount: 100,
    poolTotalEntriesAllowed: 30,
    poolOrganizer: 'Scott Chapman',
    poolOrganizerPhone: '4055551234',
    eventLinkId: 1,
    poolInviteEmails: 'scottbchapman@gmail.com, ninjajilly@gmail.com',
  };

  pool: Pool;
  private subPool: Subscription;
  private eventInfo$: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // ************************ */
  // get poolTags(): FormArray {
  //  return this.poolForm.get('poolTags') as FormArray;
  // }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private poolService: PoolService,
              private afs: AngularFirestore,
              private eventNames: EventService,
              private eventNamesAndId: EventService,) {


    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    // Definitely need to add more checks here.  Email valid, number, etc.
    this.validationMessages = {
      poolName: {
        required: 'Pool poolName is required.',
        minlength: 'Pool poolName must be at least three characters.',
        maxlength: 'Pool poolName cannot exceed 50 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.indexRef = this.afs.collection<TotalsStore>('totals');
    this.totals$ = this.indexRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as TotalsStore;
        const fireDocId = action.payload.doc.id;
        return { fireDocId, ...data };
      });
    }));


  }

  ngOnInit(): void {

    this.date = moment();
    console.log('Moment: ', moment());

    this.poolForm = this.fb.group({
      eventLinkId: '',
      poolName: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(50)]],
                      // More Validators below for other fields.
      poolDeadlineDate: '',
      poolType: '',
      poolEntryAmount: '',
      poolTotalEntriesAllowed: '',
      poolPaymentBreakdown: '',
      poolImageUrlBackground: '',
      poolImageUrlMain: '',
      poolOrganizer: '',
      poolOrganizerPhone: '',
      poolInviteEmails: '',
    });

    // this.eventNames.getEventNames().subscribe({
    //   next: ets => {
    //     this.events = ets;
    //     console.log(this.events);
    //   },
    //   error: err => this.errorMessage = err
    // });

    this.eventNamesAndId.getEvents().subscribe({
      next: eventsId => {
        console.log('events: ', eventsId);
        //this.eventsAndId = eventsId;
        this.onlyAddFutureEvents(eventsId);
      },
      error: err => this.errorMessage = err
    });

    // Read the poolId from the route parameter
    this.subPool = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getPool(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.subPool.unsubscribe();
    // this.eventInfo$.unsubscribe(); // comment out for now
  }

  ngAfterViewInit(): void {
    // Watch for the blur pool from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur pool observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.poolForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(200)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.poolForm);
      // console.log(this.displayMessage);
    });
  }




// Past events cannot be bet upon so push only future events
onlyAddFutureEvents(allEvents){
let currentDate = new Date();
currentDate.getTime();

for(let eachEvent of allEvents){
  let combinedDate = eachEvent.eventStartDate + ' ' + eachEvent. eventStartTime;
  // let fakeDate = 'June 3, 2020 1:30:00 PM GMT-5';
  // console.log('combTime:', combinedDate);
  let compDate = new Date(combinedDate);
  // let compDate = new Date(fakeDate);
  // console.log('EE:', compDate, 'CD: ', currentDate);
  if (compDate > currentDate){
    this.eventsAndId.push(eachEvent);
  }
}
};

  getPool(id: number): void {
    this.poolService.getPool(id).subscribe({
        next: (pool: Pool) => this.displayPool(pool),
        error: err => this.errorMessage = err
      });
  }

  displayPool(pool: Pool): void {
    if (this.poolForm) {
      this.poolForm.reset();
    }
    this.pool = pool;

    if (this.pool.id === 0) {
      this.pageTitle = 'Create a Pool';
    } else {
      this.pageTitle = `Edit a Pool: ${this.pool.poolName}`;
    }

    // Update the data on the form
    this.poolForm.patchValue({
      eventLinkId: this.pool.eventLinkId,
      poolName: this.pool.poolName,
      poolDeadlineDate: this.pool.poolDeadlineDate,
      poolType: this.pool.poolType,
      poolEntryAmount: this.pool.poolEntryAmount,
      poolTotalEntriesAllowed: this.pool.poolTotalEntriesAllowed,
      poolPaymentBreakdown: this.pool.poolPaymentBreakdown,
      poolImageUrlBackground: this.pool.poolImageUrlBackground,
      poolImageUrlMain: this.pool.poolImageUrlMain,
      // Organizer should be replaced with user eventually
      poolOrganizer: this.pool.poolOrganizer,
      poolOrganizerPhone: this.pool.poolOrganizerPhone,
      poolInviteEmails: this.pool.poolInviteEmails,
    });
  }

  deletePool(): void {
    if (this.pool.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the pool: ${this.pool.poolName}?`)) {
        this.poolService.deletePool(this.pool.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  savePool(): void {
  if (this.poolForm.valid) {
      if (this.poolForm.dirty) {
        const p = { ...this.pool, ...this.poolForm.value };

        if (p.id === 0) {
          this.poolService.createPool(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.poolService.updatePool(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }



// ToDo: Submitted emails need an invitation link sent to their email to join the pool.

  saveFirePool(): void {
    if (this.poolForm.valid) {
      if (this.poolForm.dirty) {
        const p = { ...this.pool, ...this.poolForm.value };

        if (p.id === 0) {
          // let indexSubscription = this.index$.subscribe({
          //   next: index => {
          //     //console.log('ID ALL: ', index);
          //     for(let i=0; i < index.length; i++){
          //       //console.log("ID, PID:", index[i].id, this.poolsId)
          //       if (Number(index[i].id) === this.poolsId){
          //         //this.autoid = index[i].id;
          //         this.autoid = index[i].docid;
          //         this.autoindex = Number(index[i].poolTotals)+1;
          //         //console.log("Inside Autos:", index[i].docid, index[i].id, index[i].poolTotals+1)
          //       }
          //     }
          //   },
          //   error(msg) {
          //     console.log('Error Getting Location: ', msg);
          //   }
          // });

          let uniqueId = this.poolService.updateFireTotalCount('totalPools');
          
          setTimeout(() => {this.totals$.subscribe({
          next: totals => {
            console.log('Tots:', totals);
            this.poolsId = totals[0].totalPools;
            // This should fire SECOND!!!  #2 ... This needs this.poolsId to be updated by totals$.
            console.log('poolsId:',this.poolsId);
            this.poolService.createFirePool(p, this.poolsId);
            
            //this.poolService.createFirePool(p, uniqueId);
            
            // This should fire LAST!!!  #4
            this.onSaveComplete();          },
          error(msg) {
            console.log('Error Getting Location: ', msg);
          }
          });
        }, 1000);

          // Need to do this inside above subscibe

        } else {
          this.poolService.updatePool(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

dateClass = (d: Date): MatCalendarCellCssClasses => {
  const date = d.getDate();
  // Highlight the 1st and 20th day of each month.
  // ToDo: change return dates to be the date of the event.
  return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
}

makeTestData() {
  // this.poolService.createFirePool(this.testPool, 99);
}


  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.poolForm.reset();
    this.router.navigate(['/pools']);
  }

// // Begin NGX DATE CLEAN UP
//   toggleMinDate(evt: any) {
//     if (evt.checked) {
//       this._setMinDate();
//     } else {
//       this.minDate = null;
//     }
//   }

//   toggleMaxDate(evt: any) {
//     if (evt.checked) {
//       this._setMaxDate();
//     } else {
//       this.maxDate = null;
//     }
//   }

  closePicker() {
    this.picker.cancel();
  }

  // private _setMinDate() {
  //   const now = new Date();
  //   this.minDate = new Date();
  //   this.minDate.setDate(now.getDate() - 1);
  // }


  // private _setMaxDate() {
  //   const now = new Date();
  //   this.maxDate = new Date();
  //   this.maxDate.setDate(now.getDate() + 1);
  // }

  // End of DateNGX


}
