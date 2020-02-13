import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Sport } from './sport';
import { SportService } from './sport.service';

import { GenericValidator } from '../shared/generic-validator';




@Component({
  templateUrl: './sport-edit.component.html'
})
export class SportEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Edit a sport';
  errorMessage: string;
  sportForm: FormGroup;

  sport: Sport;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  //************************ */
  //get sportTags(): FormArray {
  //  return this.sportForm.get('sportTags') as FormArray;
  //}

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private sportService: SportService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      sportName: {
        required: 'Sport sportName is required.',
        minlength: 'Sport sportName must be at least three characters.',
        maxlength: 'Sport sportName cannot exceed 50 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.sportForm = this.fb.group({
      sportName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      sportType: ['', Validators.required],
      sportParticipants: '',
      sportDivisions: '',
      sportLevels: '',
      sportBreakdowns: '',
    });

    // Read the sportId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getSport(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur sport from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur sport observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.sportForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.sportForm);
    });
  }

  getSport(id: number): void {
    this.sportService.getSport(id).subscribe({
        next: (sport: Sport) => this.displaySport(sport),
        error: err => this.errorMessage = err
      });
  }

  displaySport(sport: Sport): void {
    if (this.sportForm) {
      this.sportForm.reset();
    }
    this.sport = sport;

    if (this.sport.id === 0) {
      this.pageTitle = 'Create a tournament';
    } else {
      this.pageTitle = `Edit a tournament: ${this.sport.sportName}`;
    }

    // Update the data on the form
    this.sportForm.patchValue({
      sportName: this.sport.sportName,
      sportType: this.sport.sportType,
      sportParticipants: this.sport.sportParticipants,
      sportDivisions: this.sport.sportDivisions,
      sportLevels: this.sport.sportLevels,
      sportBreakdowns: this.sport.sportBreakdowns

    });
  }

  deleteSport(): void {
    if (this.sport.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the sport: ${this.sport.sportName}?`)) {
        this.sportService.deleteSport(this.sport.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveSport(): void {
    if (this.sportForm.valid) {
      if (this.sportForm.dirty) {
        const p = { ...this.sport, ...this.sportForm.value };

        if (p.id === 0) {
          this.sportService.createSport(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.sportService.updateSport(p)
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
    this.sportForm.reset();
    this.router.navigate(['/sports']);
  }
}
