import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Wrestler } from './wrestler';

@Injectable({
  providedIn: 'root'
})
export class WrestlerService {
  private wrestlersUrl = 'api/wrestlers';

  constructor(private http: HttpClient) { }

  getWrestlers(): Observable<Wrestler[]> {
    return this.http.get<Wrestler[]>(this.wrestlersUrl)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWrestler(id: number): Observable<Wrestler> {
    console.log('In Wrestler');
    if (id === 0) {
      return of(this.initializeWrestler());
    }
    const url = `${this.wrestlersUrl}/${id}`;
    console.log(url);
    return this.http.get<Wrestler>(url)
      .pipe(
        tap(data => console.log('getWrestler: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createWrestler(wrestler: Wrestler): Observable<Wrestler> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    wrestler.id = null;  //DOES NOT HAVE A ID???????????
    return this.http.post<Wrestler>(this.wrestlersUrl, wrestler, { headers })
      .pipe(
        tap(data => console.log('createWrestler: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteWrestler(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.wrestlersUrl}/${id}`;
    return this.http.delete<Wrestler>(url, { headers })
      .pipe(
        tap(data => console.log('deleteWrestler: ' + id)),
        catchError(this.handleError)
      );
  }

  updateWrestler(wrestler: Wrestler): Observable<Wrestler> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.wrestlersUrl}/${wrestler.id}`;
    return this.http.put<Wrestler>(url, wrestler, { headers })
      .pipe(
        tap(() => console.log('updateWrestler: ' + wrestler.id)),
        // Return the wrestler on an update
        map(() => wrestler),
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

  private initializeWrestler(): Wrestler {
    // Return an initialized object
    return {
      id: 0,
      wrestlerFirstName: '',
      wrestlerMiddleName: '',
      wrestlerLastName: '',
      wrestlerYearCollege: '',
      wrestlerHeight: '',
      wrestlerWeight: '',
      wrestlerHometownCity: '',
      wrestlerHometownState: '',
      wrestlerHighSchool: '',
      wrestlerCollege: '',
      wrestlerMajor: '',
      wrestlerWins: null,
      wrestlerLoses: null,
      wrestlerImageUrl: ''
    };
  }
}
