import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subscription, fromEvent, merge} from 'rxjs';

import {Event} from './event';
import {EventService} from './event.service';
import {SportService} from '../sports/sport.service';

import {GenericValidator} from '../shared/generic-validator';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';


export interface Levels {
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
  //HTML Only variables - stored as an array but for error checking on the users

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
  levels: Levels[] = [];

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

  // data
  data = {
    divisions: [this.initName('Divisions')]
  };


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
      eventSeeding: '',
      eventNumOfSeeding: null,
      eventOrganizerFullName: '',
      eventOrganizerPhone: null,
      eventBracketType: '',
      eventBracketNumOfParticipantsPerClass: null,
      eventPlaceWinners: null,
      eventExtraInstructions: '',
      divisions_F: this.fb.array(this.data.divisions, this.validateArrayNotEmpty)
    });

    // Read the eventId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const eventId = +params.get('id');
        this.getEvent(eventId);
      }
    );

    this.eventForm.get('divisions_F').statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
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
      const control = ctrl;
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
      const control = <FormArray>this.eventForm.get('names_F');
      control.removeAt(idx + 1);
    }

    ctrl.value.val.splice(idx, 1);

  }

  addNewChipList(new_chip_name: string) {
    console.log("New Chip:", new_chip_name);
    const items = this.eventForm.get('names_F') as FormArray;
    items.push(this.initName(new_chip_name));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  change($event) {
    // Angular does not know that the value has changed
    // from our component, so we need to update her with the new value.
    this.onChange($event.target.textContent);
  }

  addEventBreakdown(): void {
    //console.log("addEventBreakdown");
    this.eventBreakdowns.push(new FormControl());
  }

  deleteEventBreakdown(index: number): void {
    //console.log("deleteEventBreakdown:", index);
    this.eventBreakdowns.removeAt(index);
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

    /*
    for(let lv of event.eventLevels){
      this.levels.push({name: lv.trim()});
    }*/

    this.eventForm.setControl('eventDivisions', this.fb.array(this.event.eventDivisions || []));
    //this.eventForm.setControl('eventLevels', this.fb.array(this.event.eventLevels || []));
    this.eventForm.setControl('eventBreakdowns', this.fb.array(this.event.eventBreakdowns || []));
    this.eventForm.setControl('divisions_F', this.fb.array(this.event.eventDivisions || []));


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
      eventSeeding: this.event.eventSeeding,
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

  saveEvent(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.dirty) {
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
