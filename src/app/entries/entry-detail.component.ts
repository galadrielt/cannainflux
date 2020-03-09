import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry, Seeds, EntryExt } from './entry';
import { EntryService } from './entry.service';
import { HttpClient } from '@angular/common/http';

import seeds from '../../assets/json/wrestlers-seeds.json';
import points from '../../assets/json/wrestlers-scores.json';
//import counts from '../../assets/json/wrestlers-counts.json';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrackData } from '../data/data';



@Component({
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})

export class EntryDetailComponent implements OnInit {
  pageTitle = 'Tournament Details';
  errorMessage = '';
  entry_final: EntryExt | undefined;
  entry: any | undefined;
  seed: Seeds |  undefined;
  display_final: EntryExt | undefined;
  wSeeds = seeds;
  wPoints = points;
  counts: any | undefined;

  displayedColumns = ['seed', 'weight', 'name', 'adPoints', 'actPoints', 'plPoints', 'points', 'numPicks', 'percentDiscount', 'discountedPoints'];
  dataSource: MatTableDataSource<TrackData>;
  updateWrestler: TrackData;
  finalWrestlers: TrackData[] = [];
  totalPickPoints: number;
  totalPickAdPoints: number;
  totalPickActPoints: number;
  totalPickPlPoints: number;
  totalPickDiscountPoints: number;
  totalAverageDiscount: number;
  poolsId: number;

  wrestlerLookupByName = this.wPoints.reduce((current_dict, new_dict) => {
    current_dict[new_dict.name.slice(0,19)] = new_dict.wrestler;
    return current_dict;
  }, {} );

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService,
              private entryServiceForSeeds: EntryService,
              private http: HttpClient) {
  }

  ngOnInit() {
    //console.log("SEEDS: ", this.wSeeds);
    this.dataSource = new MatTableDataSource<TrackData>();
    const param = this.route.snapshot.paramMap.get('id');
    const param2 = this.route.snapshot.paramMap.get('poolsId');
    if (param && param2) {
      const id = +param;
      this.poolsId = +param2;
      this.entry_final = {
        id: id,
        poolsId: this.poolsId,
        entryUsername: "",
        entryName: "",
        entryPicks: []
      };
      this.getEntry(this.poolsId, id);
    }
  }


  getEntry(poolsId: number, id: number) {

    this.entryService.getFireEntry(poolsId, id).subscribe({
    //this.entryService.getEntry(id).subscribe({
      next: entry => {
        this.entry = entry;
        this.entry_final = {
          id: this.entry[0].id,
          poolsId: poolsId,
          entryUsername: this.entry[0].entryUsername,
          entryName: this.entry[0].entryName,
          entryPicks: [this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[0].toString(), 0).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[1].toString(), 1).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[2].toString(), 2).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[3].toString(), 3).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[4].toString(), 4).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[5].toString(), 5).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[6].toString(), 6).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[7].toString(), 7).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[8].toString(), 8).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[9].toString(), 9).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[10].toString(), 10).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[11].toString(), 11).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[12].toString(), 12).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[13].toString(), 13).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[14].toString(), 14).slice(0,19)],
                       this.wrestlerLookupByName[this.entryService.getSeedName(this.entry[0].entryPicks[15].toString(), 15).slice(0,19)]
                      ]
        };

        console.log("FINAL ENTRY:", this.entry_final);
      },
      error: err => this.errorMessage = err
    });
    // Need interface that is entry + totals so EntryComplete?
    this.totalPickDiscountPoints = 0;
    this.totalPickAdPoints = 0;
    this.totalPickActPoints = 0;
    this.totalPickPlPoints = 0;
    this.totalPickPoints = 0;

    this.entryService.getFireIndex(poolsId).subscribe({
      //this.entryService.getEntry(id).subscribe({
        next: counts => {
          this.counts = counts;
          console.log("Counts:", this.counts);
        },
        error: err => this.errorMessage = err
      });


    // Need to convert above code into a Promise to get returned variable
    setTimeout(() => {  
    for (let x = 0; x<16; x++){
      console.log("16:", x);
      //this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight);
      this.updateWrestler = {
              seed: (x+1).toString(),
              weight: this.entry_final.entryPicks[x].weight,
              name: this.entry_final.entryPicks[x].name,
              adPoints: this.entry_final.entryPicks[x].adPoints,
              actPoints: this.entry_final.entryPicks[x].actPoints,
              plPoints: this.entry_final.entryPicks[x].plPoints,
              points: this.entry_final.entryPicks[x].points,
              numPicks: this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)] ? this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)].toString() : "0", // Sum up total number of people who picked them
              percentDiscount: this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]>1 ? (1 - (this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]-1)/this.counts[0].index).toFixed(4).toString() : "1",  // calculate 1 - (numPicks-1)/total entries
              discountedPoints: this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]>1 ? ((1 - (this.counts[0][x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]-1)/this.counts[0].index)*Number(this.entry_final.entryPicks[x].points)).toFixed(2).toString() : this.entry_final.entryPicks[x].points.toString()
 
        //       numPicks: counts[this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)][x] ? counts[x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)].toString() : "0", // Sum up total number of people who picked them
              // percentDiscount: counts[x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]>1 ? (1 - (counts[x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]-1)/counts[16][0]).toFixed(4).toString() : "1",  // calculate 1 - (numPicks-1)/total entries
              // discountedPoints: counts[x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]>1 ? ((1 - (counts[x][this.entryService.getSeedArrayIndex(this.entry_final.entryPicks[x].weight)]-1)/counts[16][0])*Number(this.entry_final.entryPicks[x].points)).toFixed(2).toString() : this.entry_final.entryPicks[x].points.toString()
        };
        this.finalWrestlers.push(this.updateWrestler);

        this.totalPickAdPoints = this.totalPickAdPoints + Number(this.updateWrestler.adPoints);
        this.totalPickActPoints = this.totalPickActPoints + Number(this.updateWrestler.actPoints);
        this.totalPickPlPoints = this.totalPickPlPoints + Number(this.updateWrestler.plPoints);
        this.totalPickPoints = this.totalPickPoints + Number(this.updateWrestler.points);
        this.totalPickDiscountPoints = this.totalPickDiscountPoints + Number(this.updateWrestler.discountedPoints);
        this.totalAverageDiscount = Number((this.totalPickDiscountPoints/this.totalPickPoints).toFixed(4));
        //console.log("TP:", this.totalPickPoints);
        //console.log("DP:", this.totalPickDiscountPoints);
    };
    
    this.dataSource = new MatTableDataSource(this.finalWrestlers);
    setTimeout(() => this.dataSource.sort = this.sort);
  }, 4000);
  }


  getSeeds(id: number) {
    this.entryServiceForSeeds.getSeeds(id).subscribe({
      next: seed => this.seed = seed,
      error: err => this.errorMessage = err
    });
    console.log(this.entry);
  }

  onBack(): void {
    this.router.navigate(['/entries', this.poolsId]);
  }

}