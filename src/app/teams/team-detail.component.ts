import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Team } from './team';
import { TeamService } from './team.service';

@Component({
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  pageTitle = 'Tournament Details';
  sealBaseUrl = 'assets/images/NCAAWrestlingTeams/NCAAWrestlingSchoolSeals/';
  mascotBaseUrl = 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/';  
  errorMessage = '';
  team: Team | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('BIG RED FLAG');
    console.log(param);
    if (param) {
      const id = +param;
      this.getTeam(id);
      console.log(id);
    }
  }

  getTeam(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: team => this.team = team,
      error: err => this.errorMessage = err
    });
    console.log(this.team);
  }

  onBack(): void {
    this.router.navigate(['/teams']);
  }

}