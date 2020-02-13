import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Sport } from './sport';
import { SportService } from './sport.service';

@Component({
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.css']
})
export class SportDetailComponent implements OnInit {
  pageTitle = 'Sport Details'; 
  errorMessage = '';
  sport: Sport | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sportService: SportService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('BIG RED FLAG');
    console.log(param);
    if (param) {
      const id = +param;
      this.getSport(id);
      console.log(id);
    }
  }

  getSport(id: number) {
    this.sportService.getSport(id).subscribe({
      next: sport => this.sport = sport,
      error: err => this.errorMessage = err
    });
    console.log(this.sport);
  }

  onBack(): void {
    this.router.navigate(['/sports']);
  }

}