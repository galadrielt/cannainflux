import { Component, OnInit } from '@angular/core';
import { Wrestler } from './wrestler';
import { WrestlerService } from './wrestler.service';
import { Store, select } from '@ngrx/store';


@Component({
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.css']
})

export class WrestlerComponent implements OnInit {
  pageTitle = '2019 NCAA Wrestling Wrestlers';
  imageWidth = 50;
  imageMargin = 2;
  showImage;
  errorMessage = '';

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
              private store: Store<any>) { }

  performFilter(filterBy: string): Wrestler[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.wrestlers.filter((wrestler: Wrestler) =>
      wrestler.wrestlerLastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    // this.showImage = !this.showImage;
    this.store.dispatch({
      type: 'TOOGLE_IMAGE_CODE',
      payload: !this.showImage

    });
  }

  ngOnInit(): void {
    this.wrestlerService.getWrestlers().subscribe({
      next: wrestlers => {
        this.wrestlers = wrestlers;
        this.filteredWrestlers = this.wrestlers;
      },
      error: err => this.errorMessage = err
    });

    this.store.pipe(select('wrestler')).subscribe(
      wrestler => {
        if (wrestler){
          this.showImage = wrestler.showImage;
        }
      }
    )
  }
}
