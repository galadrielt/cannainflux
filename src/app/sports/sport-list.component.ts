import { Component, OnInit } from '@angular/core';

import { Sport } from './sport';
import { SportService } from './sport.service';


@Component({
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css']
})

export class SportComponent implements OnInit {
  pageTitle = 'Sports';
  //outlineBaseUrl = 'assets/images/OutlineSports/';
  //mascotBaseUrl = 'assets/images/OlympicSports/';
  //imageHeight = 25;
  //imageMargin = 2;
  showImage = true;
  errorMessage = '';


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSports = this.listFilter ? this.performFilter(this.listFilter) : this.sports;
  }

  filteredSports: Sport[] = [];
  sports: Sport[] = [];
  sports2;

  constructor(
    private sportService: SportService,
    private mySports: SportService
    ) { }

  performFilter(filterBy: string): Sport[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.sports.filter((sport: Sport) =>
      sport.sportName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    //console.log(sports2);
    this.sportService.getSports().subscribe({
      next: sports => {
        this.sports = sports;
        this.filteredSports = this.sports;
      },
      error: err => this.errorMessage = err
    });
  }
}