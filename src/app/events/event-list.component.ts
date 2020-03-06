import { Component, OnInit } from '@angular/core';

import { Event } from './event';
import { EventService } from './event.service';

@Component({
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  pageTitle = 'Follow an event';
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEvents = this.listFilter ? this.performFilter(this.listFilter) : this.events;
  }

  filteredEvents: Event[] = [];
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  performFilter(filterBy: string): Event[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.events.filter((event: Event) =>
      event.eventName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: events => {
        this.events = events;
        this.filteredEvents = this.events;
      },
      error: err => this.errorMessage = err
    });
  }
}
