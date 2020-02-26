import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry } from './entry';
import { EntryService } from './entry.service';

@Component({
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  pageTitle = 'Tournament Details';
  //sealBaseUrl = 'assets/images/NCAAWrestlingTeams/NCAAWrestlingSchoolSeals/';
  //mascotBaseUrl = 'assets/images/NCAAWrestlingEntrys/NCAAWrestlingMascotLogo/';  
  errorMessage = '';
  entry: Entry | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('BIG RED FLAG');
    console.log(param);
    if (param) {
      const id = +param;
      this.getEntry(id);
      console.log(id);
    }
  }

  getEntry(id: number) {
    this.entryService.getEntry(id).subscribe({
      next: entry => this.entry = entry,
      error: err => this.errorMessage = err
    });
    console.log(this.entry);
  }

  onBack(): void {
    this.router.navigate(['/entries']);
  }

}