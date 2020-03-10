import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Entry } from './entry';
import { EntryService } from './entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import points from '../../assets/json/wrestlers-scores.json';


@Component({
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})


export class EntryComponent implements OnInit, AfterViewInit {
  pageTitle = '';
  errorMessage = '';
  poolsId = 0;
  private sub: Subscription;
  discountedPointsTotal: number [];
  counts: any | undefined;
  totalPickDiscountPoints: number;
  singlePickDiscountPoints: number;
  wPoints = points;

  wrestlerLookupByName = this.wPoints.reduce((current_dict, new_dict) => {
    current_dict[new_dict.name.slice(0,19)] = new_dict.wrestler;
    return current_dict;
  }, {} );


  cmp(a, b) {
    console.log("A: ", a, "B: ", b)
    if (a < b) return +1;
    if (a > b) return -1;
    return 0;
  } 

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEntries = this.listFilter ? this.performFilter(this.listFilter) : this.entries;
  }


  filteredEntries: any[] = [];
  //filteredEntries: Entry[] = [];
  //entries: Entry[] = [];
  entries: any[];
  

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  performFilter(filterBy: string): Entry[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.entries.filter((entry: Entry) =>
    entry.entryUsername.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(
      params => {
        this.poolsId = +params.get('poolsId');

        this.entryService.getFireIndex(this.poolsId).subscribe({
          //this.entryService.getEntry(id).subscribe({
            next: counts => {
              this.counts = counts;
              //console.log("Counts:", this.counts);
            },
            error: err => this.errorMessage = err
          });

    this.entryService.getFireEntries(this.poolsId).subscribe({
        next: entries => {
          //entries.sort((a, b) => b.entryPoints - a.entryPoints);
          this.entries = entries;
          this.filteredEntries = this.entries;
          //console.log("Entries:", this.entries);
        },
        error: err => this.errorMessage = err
      });
      setTimeout(() => { 
        //console.log("TCI:", this.counts[0].index); 
      for (let y = 0; y < this.counts[0].index; y++){ 
        this.totalPickDiscountPoints = 0;
        for (let x = 0; x < 16; x++){
          this.singlePickDiscountPoints = 0;
          if (this.counts[0][x][this.entryService.getSeedArrayIndex(this.entries[y].entryPicks[x].toString())] === undefined){
            console.log("1:", this.entries[y].entryPicks[x]);
            console.log("2:", this.entryService.getSeedArrayIndex((this.entries[y].entryPicks[x].toString())));
            console.log("y,x:", y, x);
            
            console.log("Weight Picked: ", this.entries[y].entryPicks[x]);
            console.log("Who: ", this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19));
            console.log("How many picked: ", this.counts[0][x][this.entryService.getSeedArrayIndex(this.entries[y].entryPicks[x].toString())]);
            console.log("Total Points: ", this.wrestlerLookupByName[this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19)].points);
          };
            this.singlePickDiscountPoints = Number(this.counts[0][x][this.entryService.getSeedArrayIndex(this.entries[y].entryPicks[x].toString())]) > 1 ? Number((1 - (this.counts[0][x][this.entryService.getSeedArrayIndex(this.entries[y].entryPicks[x].toString())]-1)/this.counts[0].index))*Number(this.wrestlerLookupByName[this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19)].points) : Number(this.wrestlerLookupByName[this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19)].points);
            //console.log("Discounted Total: ", this.singlePickDiscountPoints);
            this.totalPickDiscountPoints = this.totalPickDiscountPoints + this.singlePickDiscountPoints;
            //console.log("TotalTotals: ", this.totalPickDiscountPoints);
          };
        this.entries[y].entryPoints = this.totalPickDiscountPoints;
      };
      }, 2000);
    }
    );
    // this.entryService.getEntries().subscribe({
    //   next: entries => {
    //     entries.sort((a, b) => b.entryPoints - a.entryPoints);
    //     this.entries = entries;
    //     this.filteredEntries = this.entries;
    //   },
    //   error: err => this.errorMessage = err
    // });

    //this.entries.sort((a, b) => b.entryPoints - a.entryPoints);

    this.filteredEntries = this.entries;
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{this.entries.sort((a, b) => b.entryPoints - a.entryPoints)}, 3000);
  }




}