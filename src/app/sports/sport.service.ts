import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Sport } from './sport';


@Injectable({
  providedIn: 'root'
})
export class SportService {
  private sportsUrl = 'api/sports';
  
  constructor(
    private http: HttpClient,
    private http2: HttpClient
    ) { 
}
  

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.sportsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => console.log(data.map(obj=>obj.sportName)),
        
        catchError(this.handleError)
        )
      );
  }
  
  getSportNames(): Observable<Sport[]> {
    return this.http.get<any[]>(this.sportsUrl)
      .pipe(
        map(data=>data.map(obj=>obj.sportName)),
        catchError(this.handleError)
        );
      
  }
  
  getSport(id: number): Observable<Sport> {
    console.log('In Sport');
    if (id === 0) {
      return of(this.initializeSport());
      console.log('Init Sport');
    }
    const url = `${this.sportsUrl}/${id}`;
    console.log(url);
    return this.http.get<Sport>(url)
      .pipe(
        tap(data => console.log('getSport: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createSport(sport: Sport): Observable<Sport> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    sport.id = null;  //DOES NOT HAVE A ID???????????
    return this.http.post<Sport>(this.sportsUrl, sport, { headers })
      .pipe(
        tap(data => console.log('createTeam: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteSport(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.sportsUrl}/${id}`;
    return this.http.delete<Sport>(url, { headers })
      .pipe(
        tap(data => console.log('deleteSport: ' + id)),
        catchError(this.handleError)
      );
  }

  updateSport(sport: Sport): Observable<Sport> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.sportsUrl}/${sport.id}`;
    return this.http.put<Sport>(url, sport, { headers })
      .pipe(
        tap(() => console.log('updateTeam: ' + sport.id)),
        // Return the team on an update
        map(() => sport),
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

  private initializeSport(): Sport {
    // Return an initialized object
    return {
        id: 0,
        sportName: '',
        sportType: '',
        sportParticipants: '',
        sportDivisions: '',
        sportLevels: '',
        sportBreakdowns: ''
    };
  }

}
