import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Wrestler } from './wrestler';
import { WrestlerService } from './wrestler.service';
import { TeamService } from '../teams/team.service';
import { GenericValidator } from '../shared/generic-validator';



@Component({
  templateUrl: './wrestler-edit.component.html'
})
export class WrestlerEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Edit a wrestler';
  errorMessage: string;
  wrestlerForm: FormGroup;

  wrestler: Wrestler;
  private sub: Subscription;
  colleges: any[];
  
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  wrestlerCollege: any;

  //************************ */
  //get wrestlerTags(): FormArray {
  //  return this.wrestlerForm.get('wrestlerTags') as FormArray;
  //}

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private wrestlerService: WrestlerService,
              private collegeNames: TeamService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      wrestlerLastName: {
        required: 'Wrestler wrestlerLastName is required.',
        minlength: 'Wrestler wrestlerLastName must be at least three characters.',
        maxlength: 'Wrestler wrestlerLastName cannot exceed 50 characters.'
      }//,
      /*wrestlerStartDate: {
        required: 'Wrestler Start Date is required.'
      },
      wrestlerStarRating: {
        range: 'Rate the wrestler between 1 (lowest) and 5 (highest).'
      }*/
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.wrestlerForm = this.fb.group({
      wrestlerLastName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      wrestlerFirstName: ['', Validators.required],
      wrestlerMiddleName: '',
      wrestlerYearCollege: '',
      wrestlerHeight: '',
      wrestlerWeight: '', 
      wrestlerHometownCity: '',
      wrestlerHometownState: '',
      wrestlerHighSchool: '',
      wrestlerCollege: '',
      wrestlerMajor: '',
      wrestlerWins: null,
      wrestlerLoses: null,
      wrestlerImageUrl: ''
    });

    this.collegeNames.getTeamNames().subscribe({
      next: teams => {
        this.colleges = teams; 
        console.log(this.colleges);
      },
      error: err => this.errorMessage = err
    });
    
    // Read the wrestlerId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getWrestler(id);
      }
    );
    //college =>
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur wrestler from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur wrestler observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.wrestlerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.wrestlerForm);
    });
  }

  getWrestler(id: number): void {
    this.wrestlerService.getWrestler(id).subscribe({
        next: (wrestler: Wrestler) => this.displayWrestler(wrestler),
        error: err => this.errorMessage = err
      });
  }

  displayWrestler(wrestler: Wrestler): void {
    if (this.wrestlerForm) {
      this.wrestlerForm.reset();
    }
    this.wrestler = wrestler;

    if (this.wrestler.id === 0) {
      this.pageTitle = 'Create a wrestler';
    } else {
      this.pageTitle = `Edit a wrestler: ${this.wrestler.wrestlerFirstName} ${this.wrestler.wrestlerLastName}`;
    }

    // Update the data on the form
    this.wrestlerForm.patchValue({
      wrestlerFirstName: this.wrestler.wrestlerFirstName,
      wrestlerMiddleName: this.wrestler.wrestlerMiddleName,
      wrestlerLastName: this.wrestler.wrestlerLastName,
      wrestlerYearCollege: this.wrestler.wrestlerYearCollege,
      wrestlerHeight: this.wrestler.wrestlerHeight,
      wrestlerWeight: this.wrestler.wrestlerWeight, 
      wrestlerHometownCity: this.wrestler.wrestlerHometownCity,
      wrestlerHometownState: this.wrestler.wrestlerHometownState,
      wrestlerHighSchool: this.wrestler.wrestlerHighSchool,
      wrestlerCollege: this.wrestler.wrestlerCollege,
      wrestlerMajor: this.wrestler.wrestlerMajor,
      wrestlerWins: this.wrestler.wrestlerWins,
      wrestlerLoses: this.wrestler.wrestlerLoses,
      wrestlerImageUrl: this.wrestler.wrestlerImageUrl

    });
  }

  deleteWrestler(): void {
    if (this.wrestler.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the wrestler: ${this.wrestler.wrestlerFirstName} ${this.wrestler.wrestlerLastName}?`)) {
        this.wrestlerService.deleteWrestler(this.wrestler.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveWrestler(): void {
    if (this.wrestlerForm.valid) {
      if (this.wrestlerForm.dirty) {
        const p = { ...this.wrestler, ...this.wrestlerForm.value };

        if (p.id === 0) {
          this.wrestlerService.createWrestler(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.wrestlerService.updateWrestler(p)
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
    this.wrestlerForm.reset();
    this.router.navigate(['/wrestlers']);
  }
}
