import { Component, OnInit } from '@angular/core';

import { Pool } from './pool';
import { PoolService } from './pool.service';


@Component({
  templateUrl: './pool-list.component.html',
  styleUrls: ['./pool-list.component.css']
})

export class PoolComponent implements OnInit {
  pageTitle = 'Pools';
  poolImageUrlMain = 'assets/images/pools/';
  imageHeight = 40;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';
  now = new Date();
  math = Math;


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPools = this.listFilter ? this.performFilter(this.listFilter) : this.pools;
  }

  filteredPools: Pool[] = [];
  pools: any[] = [];

  constructor(
    private poolService: PoolService,
    ) { }

  performFilter(filterBy: string): Pool[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.pools.filter((pool: Pool) =>
      pool.poolName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.poolService.getFirePools().subscribe({
      next: pools => {
        this.pools = pools;
        this.filteredPools = this.pools;
      },
      error: err => this.errorMessage = err
    });
    // this.poolService.getPools().subscribe({
    //   next: pools => {
    //     this.pools = pools;
    //     this.filteredPools = this.pools;
    //   },
    //   error: err => this.errorMessage = err
    // });
    setInterval(() => {
      this.now = new Date();
   }, 1000);
  }
}
