import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Team } from './team';
import { TeamService } from './team.service';

import { GenericValidator } from '../shared/generic-validator';




@Component({
  templateUrl: './team-edit.component.html'
})
export class TeamEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Edit a team';
  errorMessage: string;
  teamForm: FormGroup;

  team: Team;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  //************************ */
  //get teamTags(): FormArray {
  //  return this.teamForm.get('teamTags') as FormArray;
  //}

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      teamName: {
        required: 'Team teamName is required.',
        minlength: 'Team teamName must be at least three characters.',
        maxlength: 'Team teamName cannot exceed 50 characters.'
      }//,
      /*teamStartDate: {
        required: 'Team Start Date is required.'
      },
      teamStarRating: {
        range: 'Rate the team between 1 (lowest) and 5 (highest).'
      }*/
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      teamAbbreviation: ['', Validators.required],
      teamMascotName: '',
      teamMascotUrl: '',
      teamConference: '',
      teamSealUrl: '',
      teamState: '',
      teamCity: ''
    });

    // Read the teamId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getTeam(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur team from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur team observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.teamForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.teamForm);
    });
  }

  getTeam(id: number): void {
    this.teamService.getTeam(id).subscribe({
        next: (team: Team) => this.displayTeam(team),
        error: err => this.errorMessage = err
      });
  }

  displayTeam(team: Team): void {
    if (this.teamForm) {
      this.teamForm.reset();
    }
    this.team = team;

    if (this.team.id === 0) {
      this.pageTitle = 'Create a tournament';
    } else {
      this.pageTitle = `Edit a tournament: ${this.team.teamName}`;
    }

    // Update the data on the form
    this.teamForm.patchValue({
      teamName: this.team.teamName,
      teamMascotName: this.team.teamMascotName,
      teamAbbreviation: this.team.teamAbbreviation,
      teamConference: this.team.teamConference,
      teamMascotUrl: this.team.teamMascotUrl,
      teamSealUrl: this.team.teamSealUrl,
      teamCity: this.team.teamCity,
      teamState: this.team.teamState

    });
  }

  deleteTeam(): void {
    if (this.team.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the team: ${this.team.teamName}?`)) {
        this.teamService.deleteTeam(this.team.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveTeam(): void {
    if (this.teamForm.valid) {
      if (this.teamForm.dirty) {
        const p = { ...this.team, ...this.teamForm.value };

        if (p.id === 0) {
          this.teamService.createTeam(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.teamService.updateTeam(p)
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
    this.teamForm.reset();
    this.router.navigate(['/teams']);
  }
}
