import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material';

@Component({
  selector: 'chip-list-validation-example',
  templateUrl: 'chip-list-validation-example.html',
  styleUrls: ['chip-list-validation-example.css'],
})
export class ChipListValidationExample implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  public myForm: FormGroup;

  // name chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // data
  data = {
    names: [this.initName('Divisions'), ['College,High School']]
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      names: this.fb.array(this.data.names, this.validateArrayNotEmpty)
    });
  }

  ngOnInit() {
    this.myForm.get('names').statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
  }

  initName(name: string, val: string[] = []): FormControl {
    console.log("initName:", this.fb.control({ name, val}));
    return this.fb.control({ name, val});
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  addChip(event: MatChipInputEvent, ctrl: FormControl): void {
    const input = event.input;
    const value = event.value;

    // Add name
    if ((value || '').trim()) {
      const control = ctrl;
      control.value.val.push(value.trim());
      console.log("Control:", control);
      if (control.value.name == "Divisions"){
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
    
    if (ctrl.value.name=="Divisions"){
      //console.log("PARENT:", ctrl, ctrl._parent.value[0], ctrl.value.name);
      const control = <FormArray>this.myForm.controls['names'];
      control.removeAt(idx+1);
    }

    ctrl.value.val.splice(idx, 1);

  }

  addNewChipList(new_chip_name: string) {
    const items = this.myForm.get('names') as FormArray;
    items.push(this.initName(new_chip_name));
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */