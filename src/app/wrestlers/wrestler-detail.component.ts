import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Wrestler } from './wrestler';
import { WrestlerService } from './wrestler.service';

@Component({
  templateUrl: './wrestler-detail.component.html',
  styleUrls: ['./wrestler-detail.component.css']
})
export class WrestlerDetailComponent implements OnInit {
  pageTitle = 'Wrestler Profile';
  errorMessage = '';
  wrestler: Wrestler | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wrestlerService: WrestlerService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log(param);
    if (param) {
      const id = +param;
      this.getWrestler(id);
      console.log(id);
    }
  }

  getWrestler(id: number) {
    this.wrestlerService.getWrestler(id).subscribe({
      next: wrestler => this.wrestler = wrestler,
      error: err => this.errorMessage = err
    });
    console.log(this.wrestler);
  }

  onBack(): void {
    this.router.navigate(['/wrestlers']);
  }

}