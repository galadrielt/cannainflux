import { Component, OnInit } from '@angular/core';

import { Entry } from './entry';
import { EntryService } from './entry.service';


@Component({
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})


export class EntryComponent implements OnInit {
  pageTitle = '2020 Ensure Cup Picks';
  errorMessage = '';

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

  filteredEntries: Entry[] = [];
  entries: Entry[] = [];

  constructor(
    private entryService: EntryService,
    ) { }

  performFilter(filterBy: string): Entry[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.entries.filter((entry: Entry) =>
    entry.entryUsername.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void {
    this.entryService.getEntries().subscribe({
      next: entries => {
        entries.sort((a, b) => b.entryPoints - a.entryPoints);
        this.entries = entries;
        this.filteredEntries = this.entries;
      },
      error: err => this.errorMessage = err
    });
  }



}