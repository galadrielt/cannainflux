import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subscription, fromEvent, merge} from 'rxjs';

import {Event} from './event';
import {EventService} from './event.service';
import {SportService} from '../sports/sport.service';

import {GenericValidator} from '../shared/generic-validator';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipList, } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';


export interface Levels {
  weight: String;
  participants: number;
  seeds: number;
}

export interface Divisions {
  name: string;
}

@Component({
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})


export class EventEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  @ViewChild('chipList') chipList: MatChipList;


  pageTitle = 'Create an Event';
  // HTML Only variables - stored as an array but for error checking on the users

  errorMessage: string;
  eventForm: FormGroup;

  eventType: any;
  eventSport: any;

  event: Event;

  private sub: Subscription;
  sts: any[];
  onChange;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  levels_data = {
                  name: '', levels: [{weight:'', participants:null, seeds: null}]
                };

  divisions: Divisions[] = [];
  datasource: MatTableDataSource<any>;


  // data to check the initial form
//   data = {
//     names: [this.initName('Divisions'),
//     [
//     {name:"High School", levels:[ 
//                           {name:"Frosh-Soph", breakdowns:["50", "60", "70"]}, 
//                           {name:"JV", breakdowns:["50", "60", "70"]},
//                           {name:"Varsity", breakdowns:["98", "106", "113", "118"]}
//                               ]
//     },
//     {name:"Youth", levels:[
//                           {name:"Age4-5", breakdowns:["50", "60", "70"]}, {name:"Age6-7", breakdowns:["50", "60", "70"]}, {name:"Age8-9", breakdowns:["50", "60", "70"]}
//                           ]
//     }
//    ]
//   ]
// };

  // data
  data = {
    divisions: [this.initName('Divisions')]
  };

  get eventDivisions(): FormArray {
    //console.log("DivisionsFOR: ",this.eventForm.get('eventDivisions') as FormArray);
    return this.eventForm.get('eventDivisions') as FormArray;
  }

  get eventLevels(): FormArray {
    //console.log("LevelsFOR: ",this.eventForm.get('eventLevels') as FormArray);
    return this.eventForm.get('eventLevels') as FormArray;
  }

  get eventBreakdowns(): FormArray {
    //console.log("BreakdownsFOR: ",this.eventForm.get('eventBreakdowns') as FormArray);
    return this.eventForm.get('eventBreakdowns') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private sportNames: SportService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      eventName: {
        required: 'Event name is required.',
        minlength: 'Event name must be at least three characters.',
        maxlength: 'Event name cannot exceed 50 characters.'
      },
      eventStartDate: {
        required: 'Event Start Date is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  /*************************
   * ngOnInit SECTION
   *************************/

  ngOnInit(): void {


    this.sportNames.getSportNames().subscribe({
      next: sports => {
        this.sts = sports;
        console.log(this.sts);
      },
      error: err => this.errorMessage = err
    });


    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      eventLocationName: '',
      eventLocationAddress: '',
      eventLocationCity: '',
      eventLocationState: '',
      eventStartDate: '',
      eventEndDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventUrl: '',
      eventImageUrl: '',
      // ADDED names for example... Get it working first.
      eventSport: 'Wrestling',
      eventDivisions: this.fb.array([' ']),
      eventLevels: this.fb.array([' ']),
      eventBreakdowns: this.fb.array([' ']),
      eventType: 'Tournament',
      eventBracketNumOfParticipantsPerClass: this.fb.array(['']),
      eventNumOfSeeding: this.fb.array(['']),
      eventOrganizerFullName: '',
      eventOrganizerPhone: null,
      eventBracketType: '',
      eventPlaceWinners: null,
      eventExtraInstructions: '',
      weights: this.fb.array([' ']),
      participants: this.fb.array([' ']),
      seeds: this.fb.array([' ']),
    });

    // Read the eventId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const eventId = +params.get('id');
        this.getEvent(eventId);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.eventForm.valueChanges, ...controlBlurs)
      // .pipe(
      //   debounceTime(1000)
      // )
      .subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.eventForm);
      });

  }

  initName(name: string, val: string[] = []): FormControl {
    console.log("NAME VAL:", name, val);
    return this.fb.control({name, val});
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: {valid: false}
      };
    }
    return null;
  }

  addChip(evt: MatChipInputEvent, ctrl: FormControl): void {
    console.log("EVENT:", evt)
    const input = evt.input;
    const value = evt.value;

    // Add name
    if ((value || '').trim()) {
      console.log("Val:", value, ctrl);
      var control = ctrl;
      control.value.val.push(value.trim());
      console.log("Control:", control);
      if (control.value.name == "Divisions") {
        let ncl = this.addNewChipList(value.trim());
        console.log(control.value);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(ctrl, val) {
    const idx = ctrl.value.val.findIndex(item => item === val);
    console.log("ctrl:", ctrl, "Val:", val, "IDE:", idx);

    if (ctrl.value.name == "Divisions") {
      //console.log("PARENT:", ctrl, ctrl._parent.value[0], ctrl.value.name);
      const control = <FormArray>this.eventForm.get('divisions_F');
      control.removeAt(idx + 1);
    }

    ctrl.value.val.splice(idx, 1);

  }


  add(evt: MatChipInputEvent): void {
    const input = evt.input;
    const value = evt.value;

    // Add our More Chips
    if ((value || '').trim()) {
      this.divisions.push({name: value.trim()});
      // I'm modifying the array directly but will it get saved unless they push the data by clicking button??
      this.event.eventDivisions.push(value.trim());
      this.eventForm.setControl('eventDivisions', this.fb.array(this.event.eventDivisions || []));
      this.eventForm.markAsDirty();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log("Divisions:", this.divisions)
  }

  remove(division: Divisions): void {
    const index = this.divisions.indexOf(division);

    if (index >= 0) {
      this.divisions.splice(index, 1);
      this.event.eventDivisions.splice(index, 1);
      this.eventForm.setControl('eventDivisions', this.fb.array(this.event.eventDivisions || []));  
      this.eventForm.markAsDirty();
    }
  }

  addNewChipList(new_chip_name: string) {
    console.log("New Chip:", new_chip_name);
    const items = this.eventForm.get('divisions_F') as FormArray;
    items.push(this.initName(new_chip_name));
  }

  addEventBreakdown(): void {
    //console.log("addEventBreakdown");
    // this.datasource = new MatTableDataSource(this.levels_data);
    // this.eventBreakdowns.push(this.fb.group({
    // weight:'',
    // participants:'',
    // seeds:'',
    // }));
    // this.levels_data.push({weight: "",participants: 0, seeds: 0});
    // this.datasource = new MatTableDataSource(this.levels_data);

    this.eventBreakdowns.push(new FormControl());
    //this.eventNumOfSeeding.push(new FormControl());
    //this.eventBracketNumOfParticipantsPerClass.push(new FormControl());
  }

  deleteEventBreakdown(index: number): void {
    //console.log("deleteEventBreakdown:", index);
    this.eventBreakdowns.removeAt(index);
    this.event.eventBreakdowns.splice(index, 1);
    this.event.eventNumOfSeeding.splice(index, 1);
    this.event.eventBracketNumOfParticipantsPerClass.splice(index, 1);
    this.eventBreakdowns.markAsDirty();
  }

  getEvent(id: number): void {
    this.eventService.getEvent(id).subscribe({
      next: (event: Event) => this.displayEvent(event),
      error: err => this.errorMessage = err
    });
  }

  displayEvent(event: Event): void {
    if (this.eventForm) {
      this.eventForm.reset();
    }

    this.event = event;

    if (this.event.id != 0) {
      this.pageTitle = `Edit a event: ${this.event.eventName}`;
    }


  for (let divs of event.eventDivisions){
    this.divisions.push({name: divs});
  }


    // CAN I Do this with spread operator??  ...
    // INITIALIZE data for dynamic form - levels_data Array
    // console.log("LEVELS_DATA:", this.levels_data);

    // for (let k = 0; k < event.eventDivisions.length; k++){
    //       this.divisions.push({name: event.eventDivisions[k]});
    //       //this.levels_data.push({name: event.eventDivisions[k], levels:[]})
    //       for(let i=0; i < event.eventBreakdowns[k].length; i++){
    //         console.log(k, " Push :" , event.eventBreakdowns[k][i], this.event.eventBracketNumOfParticipantsPerClass[k][i], this.event.eventNumOfSeeding[k][i]);
    //         this.levels_data[k].levels[i].push({weight: event.eventBreakdowns[k][i], participants: this.event.eventBracketNumOfParticipantsPerClass[k][i], seeds: this.event.eventNumOfSeeding[k][i]});
    //       };
    // };
      
    this.eventForm.setControl('eventDivisions', this.fb.array(this.event.eventDivisions || []));
    //this.eventForm.setControl('eventLevels', this.fb.array(this.event.eventLevels || []));
    this.eventForm.setControl('weights', this.fb.array(this.event.eventBreakdowns || []));
    this.eventForm.setControl('participants', this.fb.array(this.event.eventBracketNumOfParticipantsPerClass || []));
    this.eventForm.setControl('seeds', this.fb.array(this.event.eventNumOfSeeding || []));
  

    // Update the data on the form
    this.eventForm.patchValue({
      eventName: this.event.eventName,
      eventLocationName: this.event.eventLocationName,
      eventLocationAddress: this.event.eventLocationAddress,
      eventLocationCity: this.event.eventLocationCity,
      eventLocationState: this.event.eventLocationState,
      eventStartDate: this.event.eventStartDate,
      eventEndDate: this.event.eventEndDate,
      eventStartTime: this.event.eventStartTime,
      eventEndTime: this.event.eventEndTime,
      eventImageUrl: this.event.eventImageUrl,
      eventSport: this.event.eventSport,
      eventUrl: this.event.eventUrl,
      eventType: this.event.eventType,
      eventNumOfSeeding: this.event.eventNumOfSeeding,
      eventOrganizerFullName: this.event.eventOrganizerFullName,
      eventOrganizerPhone: this.event.eventOrganizerPhone,
      eventBracketType: this.event.eventBracketType,
      eventBracketNumOfParticipantsPerClass: this.event.eventBracketNumOfParticipantsPerClass,
      eventPlaceWinners: this.event.eventPlaceWinners,
      eventExtraInstructions: this.event.eventExtraInstructions
    });
  }

  deleteEvent(): void {
    if (this.event.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the event: ${this.event.eventName}?`)) {
        this.eventService.deleteEvent(this.event.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  displayedColumns: string[] = ['weights', 'participants', 'seeds'];
  //displayedColumns: string[] = ['weight'];


  // SAVE FORM DATA HERE BELOW
  // ----------------------------------

  saveEvent(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.dirty) {
        console.log("FORM VALUES SUMBITTED:", JSON.stringify(this.eventForm.value));
        const p = {...this.event, ...this.eventForm.value};

        if (p.id === 0) {
          this.eventService.createEvent(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          console.log("FORM DATA:", p);
          this.eventService.updateEvent(p)
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

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
