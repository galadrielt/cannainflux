import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';

import { Event } from './event';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private eventsUrl = 'api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        //tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEventNames(): Observable<Event[]> {
    return this.http.get<any[]>(this.eventsUrl)
      .pipe(
        map(data=>data.map(obj=>obj.eventName)),
        catchError(this.handleError)
        );
  }


  getEvent(id: number): Observable<Event> {
    if (id === 0) {
      return of(this.initializeEvent());
    }
    const url = `${this.eventsUrl}/${id}`;
    console.log(url);
    return this.http.get<Event>(url)
      .pipe(
        delay(250), //pretend time
        tap(data => console.log('getEvent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createEvent(event: Event): Observable<Event> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    event.id = null;
    return this.http.post<Event>(this.eventsUrl, event, { headers })
      .pipe(
        tap(data => console.log('createEvent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteEvent(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.eventsUrl}/${id}`;
    return this.http.delete<Event>(url, { headers })
      .pipe(
        tap(data => console.log('deleteEvent: ' + id)),
        catchError(this.handleError)
      );
  }

  updateEvent(event: Event): Observable<Event> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.eventsUrl}/${event.id}`;
    return this.http.put<Event>(url, event, { headers })
      .pipe(
        tap(() => console.log('UpdateEvent: ' + event.id)),
        tap(() => console.log('UPDATE: ' + JSON.stringify(event))),
        // Return the event on an update
        map(() => event),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeEvent(): Event {
    // Return an initialized object
    return {
      id: 0,
      eventName: null,
      eventLocationName: null,
      eventLocationAddress: null,
      eventLocationCity: null,
      eventLocationState: null,
      eventStartDate: null,
      eventEndDate: null,
      eventStartTime: null,
      eventEndTime: null,
      eventUrl: null,
      eventImageUrl: null,
      eventSport: 'Wrestling',
      eventDivisions: [' '],
      eventLevels: [' '],
      eventBreakdowns: [['']],
      eventType: 'Tournament',
      eventNumOfSeeding: null,
      eventOrganizerFullName: null,
      eventOrganizerPhone: null,
      eventBracketType: null,
      eventBracketNumOfParticipantsPerClass: null,
      eventPlaceWinners: null,
      eventExtraInstructions: null
    };
  }
}
