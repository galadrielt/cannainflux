import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from './event';
import { EventService } from './event.service';

@Component({
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  pageTitle = 'Event Details';
  errorMessage = '';
  event: Event | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log(param);
    if (param) {
      const id = +param;
      this.getEvent(id);
      console.log(id);
    }
  }

  getEvent(id: number) {
    this.eventService.getEvent(id).subscribe({
      next: event => this.event = event,
      error: err => this.errorMessage = err
    });
    console.log(event);
  }

  onBack(): void {
    this.router.navigate(['/events']);
  }

}