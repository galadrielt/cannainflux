import { Component } from '@angular/core';
//import * as seeds from '../../../../grabWrestlersBrackets/wrestlers-seeds.json';
import * as points from '../../../../grabPoints/wrestlers-seeds.json';
import * as deductions from '../../../../grabPoints/wrestlers-deductions.json';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent {
  public pageTitle = 'Results';


  //READ IN THE DATABASE OF WRESTLERS AS WELL.  OR just link to it?

  wPoints = points;
  wDeductions = deductions;


}