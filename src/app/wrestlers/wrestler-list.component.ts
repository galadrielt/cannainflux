import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Wrestler } from './wrestler';
import { WrestlerService } from './wrestler.service';
import { Store, select } from '@ngrx/store';
import * as fromWrestler from './state/wrestler.reducer';
import { State } from '../state/app.state';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.css']
})

export class WrestlerComponent implements OnInit, AfterContentInit, OnDestroy {

pageTitle = '2019-20 NCAA Wrestling Wrestlers';
imageWidth = 50;
imageMargin = 2;
showImage$: Observable<boolean>;
errorMessage = '';
wr$;

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

constructor(private wrestlerService: WrestlerService,
            private store: Store<State>) { }

  performFilter(filterBy: string): Wrestler[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.wrestlers.filter((wrestler: Wrestler) =>
      wrestler.wrestlerLastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.store.dispatch({
      type: 'TOOGLE_IMAGE_CODE'
    });
  }

  ngOnInit(): void {
    this.wr$ = this.wrestlerService.getWrestlers().subscribe({
      next: wrestlers => {
        this.wrestlers = wrestlers;
        this.filteredWrestlers = this.wrestlers;
      },
      error: err => this.errorMessage = err
    });

    // TODO: unsubscribe
    this.showImage$ = this.store.pipe(select(fromWrestler.getShowImages));
    // .subscribe(
    //   ngrxShowImage =>  this.showImage = ngrxShowImage
    //   );
  }

  ngAfterContentInit(): void {
    // console.log('ShowImage:', this.showImage);
  }

  ngOnDestroy(): void {
    this.wr$.unsubscribe();
  }

}
