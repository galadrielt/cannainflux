import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subscription, fromEvent, merge} from 'rxjs';

import {Order} from './order';
import {OrderService} from './order.service';
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
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})


export class OrderEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  @ViewChild('chipList') chipList: MatChipList;


  pageTitle = 'Create an Invoice';
  // HTML Only variables - stored as an array but for error checking on the users

  errorMessage: string;
  orderForm: FormGroup;

  orderType: any;
  orderSport: any;

  order: Order;

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

  get orderDivisions(): FormArray {
    //console.log("DivisionsFOR: ",this.orderForm.get('orderDivisions') as FormArray);
    return this.orderForm.get('orderDivisions') as FormArray;
  }

  get orderLevels(): FormArray {
    //console.log("LevelsFOR: ",this.orderForm.get('orderLevels') as FormArray);
    return this.orderForm.get('orderLevels') as FormArray;
  }

  get orderBreakdowns(): FormArray {
    //console.log("BreakdownsFOR: ",this.orderForm.get('orderBreakdowns') as FormArray);
    return this.orderForm.get('orderBreakdowns') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private sportNames: SportService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      orderName: {
        required: 'Order name is required.',
        minlength: 'Order name must be at least three characters.',
        maxlength: 'Order name cannot exceed 50 characters.'
      },
      orderStartDate: {
        required: 'Order Start Date is required.'
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


    this.orderForm = this.fb.group({
      orderName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      orderLocationName: '',
      orderLocationAddress: '',
      orderLocationCity: '',
      orderLocationState: '',
      orderStartDate: '',
      orderEndDate: '',
      orderStartTime: '',
      orderEndTime: '',
      orderUrl: '',
      orderImageUrl: '',
      // ADDED names for example... Get it working first.
      orderSport: 'Wrestling',
      orderDivisions: this.fb.array([' ']),
      orderLevels: this.fb.array([' ']),
      orderBreakdowns: this.fb.array([' ']),
      orderType: 'Tournament',
      orderBracketNumOfParticipantsPerClass: this.fb.array(['']),
      orderNumOfSeeding: this.fb.array(['']),
      orderOrganizerFullName: '',
      orderOrganizerPhone: null,
      orderBracketType: '',
      orderPlaceWinners: null,
      orderExtraInstructions: '',
      weights: this.fb.array([' ']),
      participants: this.fb.array([' ']),
      seeds: this.fb.array([' ']),
    });

    // Read the orderId from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const orderId = +params.get('id');
        this.getOrder(orderId);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur order from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur order observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.orderForm.valueChanges, ...controlBlurs)
      // .pipe(
      //   debounceTime(1000)
      // )
      .subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.orderForm);
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
    console.log("ORDER:", evt)
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
      const control = <FormArray>this.orderForm.get('divisions_F');
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
      this.order.orderDivisions.push(value.trim());
      this.orderForm.setControl('orderDivisions', this.fb.array(this.order.orderDivisions || []));
      this.orderForm.markAsDirty();
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
      this.order.orderDivisions.splice(index, 1);
      this.orderForm.setControl('orderDivisions', this.fb.array(this.order.orderDivisions || []));
      this.orderForm.markAsDirty();
    }
  }

  addNewChipList(new_chip_name: string) {
    console.log("New Chip:", new_chip_name);
    const items = this.orderForm.get('divisions_F') as FormArray;
    items.push(this.initName(new_chip_name));
  }

  addOrderBreakdown(): void {
    //console.log("addOrderBreakdown");
    // this.datasource = new MatTableDataSource(this.levels_data);
    // this.orderBreakdowns.push(this.fb.group({
    // weight:'',
    // participants:'',
    // seeds:'',
    // }));
    // this.levels_data.push({weight: "",participants: 0, seeds: 0});
    // this.datasource = new MatTableDataSource(this.levels_data);

    this.orderBreakdowns.push(new FormControl());
    //this.orderNumOfSeeding.push(new FormControl());
    //this.orderBracketNumOfParticipantsPerClass.push(new FormControl());
  }

  deleteOrderBreakdown(index: number): void {
    //console.log("deleteOrderBreakdown:", index);
    this.orderBreakdowns.removeAt(index);
    this.order.orderBreakdowns.splice(index, 1);
    this.order.orderNumOfSeeding.splice(index, 1);
    this.order.orderBracketNumOfParticipantsPerClass.splice(index, 1);
    this.orderBreakdowns.markAsDirty();
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe({
      next: (order: Order) => this.displayOrder(order),
      error: err => this.errorMessage = err
    });
  }

  displayOrder(order: Order): void {
    if (this.orderForm) {
      this.orderForm.reset();
    }

    this.order = order;

    if (this.order.id != 0) {
      this.pageTitle = `Edit a order: ${this.order.orderName}`;
    }


  for (let divs of order.orderDivisions){
    this.divisions.push({name: divs});
  }


    // CAN I Do this with spread operator??  ...
    // INITIALIZE data for dynamic form - levels_data Array
    // console.log("LEVELS_DATA:", this.levels_data);

    // for (let k = 0; k < order.orderDivisions.length; k++){
    //       this.divisions.push({name: order.orderDivisions[k]});
    //       //this.levels_data.push({name: order.orderDivisions[k], levels:[]})
    //       for(let i=0; i < order.orderBreakdowns[k].length; i++){
    //         console.log(k, " Push :" , order.orderBreakdowns[k][i], this.order.orderBracketNumOfParticipantsPerClass[k][i], this.order.orderNumOfSeeding[k][i]);
    //         this.levels_data[k].levels[i].push({weight: order.orderBreakdowns[k][i], participants: this.order.orderBracketNumOfParticipantsPerClass[k][i], seeds: this.order.orderNumOfSeeding[k][i]});
    //       };
    // };

    this.orderForm.setControl('orderDivisions', this.fb.array(this.order.orderDivisions || []));
    //this.orderForm.setControl('orderLevels', this.fb.array(this.order.orderLevels || []));
    this.orderForm.setControl('weights', this.fb.array(this.order.orderBreakdowns || []));
    this.orderForm.setControl('participants', this.fb.array(this.order.orderBracketNumOfParticipantsPerClass || []));
    this.orderForm.setControl('seeds', this.fb.array(this.order.orderNumOfSeeding || []));


    // Update the data on the form
    this.orderForm.patchValue({
      orderName: this.order.orderName,
      orderLocationName: this.order.orderLocationName,
      orderLocationAddress: this.order.orderLocationAddress,
      orderLocationCity: this.order.orderLocationCity,
      orderLocationState: this.order.orderLocationState,
      orderStartDate: this.order.orderStartDate,
      orderEndDate: this.order.orderEndDate,
      orderStartTime: this.order.orderStartTime,
      orderEndTime: this.order.orderEndTime,
      orderImageUrl: this.order.orderImageUrl,
      orderSport: this.order.orderSport,
      orderUrl: this.order.orderUrl,
      orderType: this.order.orderType,
      orderNumOfSeeding: this.order.orderNumOfSeeding,
      orderOrganizerFullName: this.order.orderOrganizerFullName,
      orderOrganizerPhone: this.order.orderOrganizerPhone,
      orderBracketType: this.order.orderBracketType,
      orderBracketNumOfParticipantsPerClass: this.order.orderBracketNumOfParticipantsPerClass,
      orderPlaceWinners: this.order.orderPlaceWinners,
      orderExtraInstructions: this.order.orderExtraInstructions
    });
  }

  deleteOrder(): void {
    if (this.order.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the order: ${this.order.orderName}?`)) {
        this.orderService.deleteOrder(this.order.id)
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

  saveOrder(): void {
    if (this.orderForm.valid) {
      if (this.orderForm.dirty) {
        console.log("FORM VALUES SUMBITTED:", JSON.stringify(this.orderForm.value));
        const p = {...this.order, ...this.orderForm.value};

        if (p.id === 0) {
          this.orderService.createOrder(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          console.log("FORM DATA:", p);
          this.orderService.updateOrder(p)
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
    this.orderForm.reset();
    this.router.navigate(['/orders']);
  }
}
