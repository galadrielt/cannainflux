import { Component, OnInit } from '@angular/core';

import { Entry } from './entry';
import { EntryService } from './entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})


export class EntryComponent implements OnInit {
  pageTitle = '';
  errorMessage = '';
  poolsId = 0;
  private sub: Subscription;

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
  entries: any[] = [];
  

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

    this.entryService.getFireEntries(this.poolsId).subscribe({
        next: entries => {
          //entries.sort((a, b) => b.entryPoints - a.entryPoints);
          this.entries = entries;
          this.filteredEntries = this.entries;
        },
        error: err => this.errorMessage = err
      });;
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
  }



}