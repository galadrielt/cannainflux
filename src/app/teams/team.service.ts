import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Team } from './team';

//import teams2 from '../assets/ncaaTeamsWrestling.json';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUrl = 'api/teams';
  
  constructor(
    private http: HttpClient,
    private http2: HttpClient
    ) { 
}
  

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => console.log(data.map(obj=>obj.teamName)),
        
        catchError(this.handleError)
        )
      );
  }
  
  getTeamNames(): Observable<Team[]> {
    return this.http.get<any[]>(this.teamsUrl)
      .pipe(
        map(data=>data.map(obj=>obj.teamName)),
        catchError(this.handleError)
        );
      
  }
  
  getTeam(id: number): Observable<Team> {
    console.log('In Team');
    if (id === 0) {
      return of(this.initializeTeam());
      console.log('Init Team');
    }
    const url = `${this.teamsUrl}/${id}`;
    console.log(url);
    return this.http.get<Team>(url)
      .pipe(
        tap(data => console.log('getTeam: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createTeam(team: Team): Observable<Team> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    team.id = null;  //DOES NOT HAVE A ID???????????
    return this.http.post<Team>(this.teamsUrl, team, { headers })
      .pipe(
        tap(data => console.log('createTeam: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteTeam(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.teamsUrl}/${id}`;
    return this.http.delete<Team>(url, { headers })
      .pipe(
        tap(data => console.log('deleteTeam: ' + id)),
        catchError(this.handleError)
      );
  }

  updateTeam(team: Team): Observable<Team> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.teamsUrl}/${team.id}`;
    return this.http.put<Team>(url, team, { headers })
      .pipe(
        tap(() => console.log('updateTeam: ' + team.id)),
        // Return the team on an update
        map(() => team),
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

  private initializeTeam(): Team {
    // Return an initialized object
    return {
        id: 0,
        teamSealUrl: '',
        teamName: '',
        teamAbbreviation: '',
        teamMascotUrl: '', 
        teamMascotName: '',
        teamConference: '',
        teamCity: '',
        teamState: ''
    };
  }

}
