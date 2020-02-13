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

  i = "";
  j = "";
  z = ""; 
  x = "";

  // data
 data = {
    names: ['Divisions',
    [
    {name:"High School", levels:[ 
                          {name:"Frosh-Soph", breakdowns:["50", "60", "70"]}, 
                          {name:"JV", breakdowns:["50", "60", "70"]},
                          {name:"Varsity", breakdowns:["98", "106", "113", "118"]}
                              ]
    },
    {name:"Youth", levels:[
                          {name:"Age4-5", breakdowns:["50", "60", "70"]}, {name:"Age6-7", breakdowns:["50", "60", "70"]}, {name:"Age8-9", breakdowns:["50", "60", "70"]}
                          ]
    }
   ]
  ]
};
  constructor(private fb: FormBuilder) {
  
  }

  ngOnInit() {
      this.myForm = this.fb.group({
      //Commented out because creates unnec.
      //names: this.fb.array(this.data.names, this.validateArrayNotEmpty)
      names: this.fb.array([this.initName('Divisions')])
    });


    //this.addNewChipList(this.data.names[0].toString());

    //console.log("data1:", this.data.names[0]);    
    //console.log("data2:", this.initName('Divisions'));
    //console.log("initNames:", this.initName('Divisions'));

    if (this.data.names[1]){
       for (this.i in <any>(this.data.names[1])) {
         this.addNewChipList(this.data.names[1][this.i].name);
        console.log(this.data.names[1][this.i].name);
          for (this.j in this.data.names[1][this.i].levels) {
            this.addNewChipList(this.data.names[1][this.i].levels[this.j].name);
            console.log(this.data.names[1][this.i].levels[this.j].name);
              for (this.z in this.data.names[1][this.i].levels[this.j].breakdowns){
                this.addNewChipList(this.data.names[1][this.i].levels[this.j].breakdowns[this.z]);
      	          console.log(this.data.names[1][this.i].levels[this.j].breakdowns[this.z]);
              }
          }
        }

    };

    console.log("DATA:", this.data);

    this.myForm.get('names').statusChanges.subscribe(
    status => this.chipList.errorState = status === 'INVALID'
    );
  }

  initName(name: string, val: string[] = []): FormControl {
    console.log("Name Val:", name, val);
    //console.log("DATA:", this.data);
    
    // if (this.data.names[0][1]){
    //   console.log("hi");
    // };

    return this.fb.control({ name, val});
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      console.log("not empty");
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
      console.log("Val:", value, ctrl);
      const control = ctrl;
      control.value.val.push(value.trim());
      console.log("Control:", control);
    if (control.value.name == "Divisions"){
      let ncl = this.addNewChipList(value.trim());
      console.log(control.value);
    }

    if (control.value.name == "Levels"){
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