import {Component, OnInit, ViewChild} from '@angular/core';
import * as seeds from '../../../../grabWrestlersBrackets/wrestlers-seeds.json';
import points from '../../../../grabPoints/wrestlers-scores.json';
import * as deductions from '../../../../grabPoints/wrestlers-deductions.json';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
 
  /** Constants used to fill up our data base. */
  const COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
  const NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
  ];



@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  public pageTitle = 'Results (DATA)';

  //READ IN THE DATABASE OF WRESTLERS AS WELL.  OR just link to it?
  wSeeds: any = seeds;
  wPoints: any = points;

  wDeductions = deductions;

  displayedColumns = ['weight', 'seed', 'name', 'adPoints', 'actPoints', 'plPoints', 'points', 'numPicks', 'percentDiscount', 'discountedPoints'];
  dataSource: MatTableDataSource<TrackData>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // Create 320 (32 wrestlers in 10 weight classes) from data
    // const users = Array.from({length: 320}, (_, k) => createWrestler(k + 1));
    // const users = {};
    //console.log("wSeeds: ", this.wSeeds);
    //  console.log("wPoints: ", this.wPoints);
    const users = this.wPoints.reduce((current_dict, new_dict) => {
      current_dict[new_dict.name] = new_dict.wrestler;
      console.log("CD: ",current_dict);
      return current_dict;
    }, {}
    );

    // let users2 = {};
    // this.wPoints.forEach(x => {users2[x.name]=x.wrestler});
    // console.log(users2);
    // for (let index = 0; index < this.wPoints.length; index++) {
    //   const element = this.wPoints[index];
    //   console.log("EL: ", element);
      
    // }
    
      
    

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
};
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


/** Builds and returns a new User. */
function mergeWrestler(id: number): TrackData {
  //MAKE THIS MORE LOOKUP .map etc.
  let seed;
  // for (let w =0; w<10; w++){
  //   console.log("SEED ", w, ": ", seeds[w])
  //   for (let x = 0; x<32; x++){
  //       if (seeds[w][x].name === points[id].name){
  //         console.log("MADE: ", seeds[w][x].name);
  //         seed = seeds[w][x].name;
  //       }
  //   }
  // }
  //let discountedPoints = .9*points[id].wrestler.total_points;

  return {
    weight: points[id].wrestler.weight,
    seed: this.seed,
    name: points[id].name,
    adPoints: points[id].wrestler.ad_points,
    actPoints: points[id].wrestler.act_points,
    plPoints: points[id].wrestler.place_points,
    points: points[id].wrestler.total_points,
    numPicks: "5", //Sum up total number of people who picked them
    percentDiscount: ".9",  //calculate 1 - (numPicks-1)/total entries
    discountedPoints: "22"//this.discountedPoints
  };
};



/** Builds and returns a new User. */
function createWrestler(id: number): TrackData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  
    return {
      weight: id.toString(),
      seed: id.toString(),
      name: name,
      adPoints: Math.round(Math.random() * 100).toString(),
      actPoints: Math.round(Math.random() * 100).toString(),
      plPoints: Math.round(Math.random() * 100).toString(),
      points: Math.round(Math.random() * 100).toString(),
      numPicks: Math.round(Math.random()).toString(),
      percentDiscount: Math.round(Math.random()).toString(),
      discountedPoints: Math.round(Math.random() * .1).toString()
    };
  };


export interface TrackData {
    weight: string;
    seed: string;
    name: string;
    adPoints: string;
    actPoints: string;
    plPoints: string;
    points: string;
    numPicks: string;
    percentDiscount: string;
    discountedPoints: string;
  };