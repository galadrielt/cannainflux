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
  timestampNow = Date.now();

  wrestlerLookupByName = this.wPoints.reduce((current_dict, new_dict) => {
    current_dict[new_dict.name.slice(0,19)] = new_dict.wrestler;
    return current_dict;
  }, {} );


  cmp(a, b) {
    //console.log('A: ', a, 'B: ', b);
    if (a < b) {return +1;}
    if (a > b) {return -1;}
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

        // this.entryService.getFireIndex(this.poolsId).subscribe({
        //   //this.entryService.getEntry(id).subscribe({
        //     next: counts => {
        //       this.counts = counts;
        //       //console.log('Counts:', this.counts);
        //     },
        //     error: err => this.errorMessage = err
        //   });

        this.entryService.getFirePoolCounts(this.poolsId).subscribe({
            next: counts => {
              this.counts = counts;
            },
            error: err => this.errorMessage = err
          });

    this.entryService.getFireEntries(this.poolsId).subscribe({
        next: entries => {
          this.entries = entries;
          this.filteredEntries = this.entries;
        },
        error: err => this.errorMessage = err
      });

      setTimeout(() => {
        //console.log('TCI:', this.counts[0].index); this.counts[0].poolTotals
      for (let y = 0; y < this.counts[0].poolTotals; y++){
        this.totalPickDiscountPoints = 0;
        for (let x = 0; x < 16; x++){
          this.singlePickDiscountPoints = 0;
          let key = this.entries[y].entryPicks[x] + '-' + Number(x+1); //weight-seed ex.: 125-1
          //console.log('Key:', key, this.counts[0][key]);
          //console.log('Discount:', Number(1 - ((this.counts[0][key]-1)/this.counts[0].poolTotals)))
          this.singlePickDiscountPoints = Number(this.counts[0][key]) > 1 ? Number(1 - ((this.counts[0][key]-1)/this.counts[0].poolTotals))*Number(this.wrestlerLookupByName[this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19)].points) : Number(this.wrestlerLookupByName[this.entryService.getSeedName(this.entries[y].entryPicks[x].toString(), x).slice(0,19)].points);
            //console.log('Discounted Total: ', this.singlePickDiscountPoints);
            this.totalPickDiscountPoints = this.totalPickDiscountPoints + this.singlePickDiscountPoints;
            //console.log('TotalTotals: ', this.totalPickDiscountPoints);
          };
        this.entries[y].entryPoints = this.totalPickDiscountPoints;
      };
      }, 2000);
    }
    );

    /////////////////////////////////////////////
    // OLD FUNCTION
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
    setTimeout(()=>{this.entries.sort((a, b) => b.entryPoints - a.entryPoints)}, 2000);
  }




}
