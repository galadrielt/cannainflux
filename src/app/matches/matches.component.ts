import { Component, OnInit } from '@angular/core';
import { Observable, Observer, NEVER, Subject, pipe, timer, combineLatest, merge, UnaryFunction, fromEvent} from 'rxjs';
import { map, mapTo, withLatestFrom, tap, distinctUntilChanged, shareReplay,distinctUntilKeyChanged, startWith, scan, pluck, switchMap} from 'rxjs/operators';
import {Counter, CountDownState, ConterStateKeys, PartialCountDownState} from './counter'



@Component({
  selector: 'pm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements OnInit{
  pagetitle = 'Matches';
  initialSetTo: number;
  initialTickSpeed: number;
  initialCountDiff: number;


ElementIds = {
  TimerDisplay: 'timer-display',
  BtnStart: 'btn-start',
  BtnPause: 'btn-pause',
  BtnUp: 'btn-up',
  BtnDown: 'btn-down',
  BtnReset: 'btn-reset',
  BtnSetTo: 'btn-set-to',
  InputSetTo: 'set-to-input',
  InputTickSpeed: 'tick-speed-input',
  InputCountDiff: 'count-diff-input'
};

//   // HERE IS INITIALIZED DATA.
  initialConterState: CountDownState = {
    count: 120,
    isTicking: false,
    tickSpeed: 1000,
    countUp: false,
    countDiff: 1
  };

// // Init CountDown counterUI
counterUI = new Counter(
  document.body,
  {
    initialSetTo: this.initialConterState.count + 10,
    initialTickSpeed: this.initialConterState.tickSpeed,
    initialCountDiff: this.initialConterState.countDiff,
  }
);



  programmaticCommandSubject = new Subject<PartialCountDownState>();

  counterCommands$ = merge(
    this.counterUI.btnStart$.pipe(mapTo({isTicking: true})),
    this.counterUI.btnPause$.pipe(mapTo({isTicking: false})),
    this.counterUI.btnSetTo$.pipe(map(n => ({count: n}))),
    this.counterUI.btnUp$.pipe(mapTo({countUp: true})),
    this.counterUI.btnDown$.pipe(mapTo({countUp: false})),
    this.counterUI.btnReset$.pipe(mapTo({...this.initialConterState})),
    this.counterUI.inputTickSpeed$.pipe(map ( n => ({tickSpeed: n}))),
    this.counterUI.inputCountDiff$.pipe(map ( n => ({countDiff: n}))),
    this.programmaticCommandSubject.asObservable()
  );

  counterState$: Observable<CountDownState> = this.counterCommands$
  .pipe(
    startWith(this.initialConterState),
    scan( (counterState: CountDownState, command): CountDownState => ( {...counterState, ...command} ) ),
    shareReplay(1)
  );

// === INTERACTION OBSERVABLES ============================================
// == INTERMEDIATE OBSERVABLES ============================================
count$ = this.counterState$.pipe(pluck<CountDownState, number>(ConterStateKeys.count));
isTicking$ = this.counterState$.pipe(this.queryChange<CountDownState, boolean>(ConterStateKeys.isTicking));
tickSpeed$ = this.counterState$.pipe(this.queryChange<CountDownState, number>(ConterStateKeys.tickSpeed));
countDiff$ = this.counterState$.pipe(this.queryChange<CountDownState, number>(ConterStateKeys.countDiff));

counterUpdateTrigger$ = combineLatest([this.isTicking$, this.tickSpeed$])
  .pipe(
    switchMap(([isTicking, tickSpeed]) => isTicking ? timer(0, Number(tickSpeed)) : NEVER)
  );

// = SIDE EFFECTS =========================================================

// == UI INPUTS ===========================================================
renderCountChange$ = this.count$.pipe(tap(n => this.counterUI.renderCounterValue(n)));
renderTickSpeedChange$ = this.tickSpeed$.pipe(tap(n => this.counterUI.renderTickSpeedInputValue(Number(n))));
renderCountDiffChange$ = this.countDiff$.pipe(tap(n => this.counterUI.renderCountDiffInputValue(Number(n))));
renderSetToChange$ = this.counterUI.btnReset$.pipe(tap(_ => { this.counterUI.renderSetToInputValue('10');}));

// == UI OUTPUTS ==========================================================
commandFromTick$ = this.counterUpdateTrigger$
  .pipe(
     withLatestFrom(this.counterState$, (_, counterState) => ({
       [ConterStateKeys.count]: counterState.count,
       [ConterStateKeys.countUp]: counterState.countUp,
       [ConterStateKeys.countDiff]: counterState.countDiff
     }) ),
     tap(({count, countUp, countDiff}) => this.programmaticCommandSubject.next( {count: count + countDiff * (countUp ? 1 : -1)}) )
  );


  constructor() {
    this.initialSetTo = this.counterUI.initialSetTo || 0;
    this.initialTickSpeed = this.counterUI.initialTickSpeed || 0 ;
    this.initialCountDiff = this.counterUI.initialCountDiff || 0;
   }

  ngOnInit(){
    console.log('Start Match');
    merge(
      // Input side effect
      this.renderCountChange$,
      this.renderTickSpeedChange$,
      this.renderCountDiffChange$,
      this.renderSetToChange$,
      // Outputs side effect
      this.commandFromTick$
    )
      .subscribe();
  }

  queryChange<T, I>(key: string): UnaryFunction<Observable<T>, Observable<I>> {
    return  pipe(
      pluck<T, I>(key),
      distinctUntilChanged<I>()
    );
  }


}
