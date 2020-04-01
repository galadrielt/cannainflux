import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Pool } from './pool';
import { AngularFirestore } from '@angular/fire/firestore';
//import firebase from 'firebase-admin';
// import 'firebase/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PoolService {
  private poolsUrl = 'api/pools';
  increment: any;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
    ) { 
      this.increment = firebase.firestore.FieldValue.increment(1);
}  

  getPools(): Observable<Pool[]> {
    return this.http.get<Pool[]>(this.poolsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => console.log(data.map(obj=>obj.poolName)),
        
        catchError(this.handleError)
        )
      );
  }

  getFirePools(): Observable<any[]> {
    return this.afs.collection('pools').valueChanges();
  }
  
  getPoolNames(): Observable<Pool[]> {
    return this.http.get<any[]>(this.poolsUrl)
      .pipe(
        map(data=>data.map(obj=>obj.poolName)),
        catchError(this.handleError)
        );
      
  }
  getPool(id: number): Observable<Pool> {
    console.log('In Pool');
    if (id === 0) {
      return of(this.initializePool());
      console.log('Init Pool');
    }
    const url = `${this.poolsUrl}/${id}`;
    console.log(url);
    return this.http.get<Pool>(url)
      .pipe(
        tap(data => console.log('getPool: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFirePool(id: number): Observable<any[]> {
    return this.afs.collection("pools", ref => ref.where("id","==",id)).valueChanges();
  }

  createPool(pool: Pool): Observable<Pool> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    pool.id = null;  //DOES NOT HAVE A ID???????????
    return this.http.post<Pool>(this.poolsUrl, pool, { headers })
      .pipe(
        tap(data => console.log('createPool: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createFirePool(pool: Pool, id: number){
    console.log("HIIIII!!!!!");
    let batch = this.afs.firestore.batch();
    let testRef = this.afs.firestore.collection('pools').doc();
    
    batch.set(testRef, {
    poolName: pool.poolName,
    poolImageUrlBackground: pool.poolImageUrlBackground, 
    poolImageUrlMain: pool.poolImageUrlMain,
    poolOrganizer: pool.poolOrganizer,
    poolOrganizerPhone: pool.poolOrganizerPhone,
    //for Pool Details
    poolDeadlineDate: pool.poolDeadlineDate,
    poolDeadlineTime: pool.poolDeadlineTime,
    poolType: pool.poolType,
    poolPaymentBreakdown: pool.poolPaymentBreakdown,
    poolEntryAmount: pool.poolEntryAmount,
    poolTotalEntriesAllowed: pool.poolTotalEntriesAllowed,
    poolDeadlineEpoch: pool.poolDeadlineEpoch,
    eventLinkId: pool.eventLinkId,
    // This one needs to be new id incremented from firestore /totals/"doc id string"/totalPoints
    id: id,//NEED THIS TO INCREMENT - cannot read database numOfEntries??
    poolTotals: 0
    });

    if (pool.poolType === "Pick Team (16 Seeds)"){
      // Create 160 counts or 16 * numOfBreakdowns...
      console.log("I am batching now.")
      // This should get passed in eventually from the Event... setup...
      let weights = [125, 133, 141, 149, 157, 165, 174, 184, 197, 285];
      for (let i=1;i<=16;i++){
        for(let wt of weights){
          let key = (wt).toString() + "-" + (i).toString();
          batch.update(testRef, {[key]: 0});
        }
      }
    }

    batch.commit();

  }

  updateFireTotalCount(key: string){
    this.afs.collection("totals").doc("2JRPOBHoMSzWnvnLaPFU")
    .update({[key]: this.increment});
    console.log("FireUps +1 totalPools");
  }



  deletePool(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.poolsUrl}/${id}`;
    return this.http.delete<Pool>(url, { headers })
      .pipe(
        tap(data => console.log('deletePool: ' + id)),
        catchError(this.handleError)
      );
  }

  updatePool(pool: Pool): Observable<Pool> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.poolsUrl}/${pool.id}`;
    return this.http.put<Pool>(url, pool, { headers })
      .pipe(
        tap(() => console.log('updatePool: ' + pool.id)),
        // Return the pool on an update
        map(() => pool),
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

  private initializePool(): Pool {
    // Return an initialized object
    return {
        id: 0,
        poolName: '',
        poolDeadlineDate: '',
        poolDeadlineTime: '',
        poolImageUrlBackground: '', 
        poolImageUrlMain: '',
        poolType: '',
        poolPaymentBreakdown: '',
        poolEntryAmount: '',
        poolTotalEntriesAllowed: null,
        poolOrganizer: '',
        poolOrganizerPhone: '',
        poolDeadlineEpoch: '',
        eventLinkId: 0
    };
  }

}
