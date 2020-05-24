import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pool } from './pool';
import { PoolService } from './pool.service';

@Component({
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})

export class PoolDetailComponent implements OnInit {
  pageTitle = 'Pool Details';
  errorMessage = '';
  pool: Pool | undefined;
  date: Date;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private poolService: PoolService) {
              this.date = new Date();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('BIG RED FLAG');
    console.log(param);
    if (param) {
      const id = +param;
      //this.getPool(id);
      this.getFirePool(id);
      console.log(id);
      console.log(this.pool);
    }
  }

  getPool(id: number) {
    this.poolService.getPool(id).subscribe({
      next: pool => this.pool = pool,
      error: err => this.errorMessage = err
    });
    console.log(this.pool);
  }

  getFirePool(id: number) {
    this.poolService.getFirePool(id).subscribe({
      next: pool => this.pool = pool[0],
      error: err => this.errorMessage = err
    });
    console.log(this.pool);
  }

  onBack(): void {
    this.router.navigate(['/pools']);
  }

}