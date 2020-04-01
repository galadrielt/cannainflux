import { Component, OnInit } from '@angular/core';
import { Wrestler } from './wrestler';
import { WrestlerService } from './wrestler.service';


@Component({
  templateUrl: './wrestler-datalist.component.html'
})

export class WrestlerDataListComponent implements OnInit {
  pageTitle = 'Just for data';
  errorMessage = '';
 
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredWrestlers = this.listFilter ? this.performFilter(this.listFilter) : this.wrestlers;
  }

  filteredWrestlers: Wrestler[] = [];
  wrestlers: Wrestler[] = [];

  constructor(private wrestlerService: WrestlerService) { }

  performFilter(filterBy: string): Wrestler[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.wrestlers.filter((wrestler: Wrestler) =>
      wrestler.wrestlerLastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.wrestlerService.getWrestlers().subscribe({
      next: wrestlers => {
        this.wrestlers = wrestlers;
        this.filteredWrestlers = this.wrestlers;
      },
      error: err => this.errorMessage = err
    });
  }
}