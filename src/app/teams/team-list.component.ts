import { Component, OnInit } from '@angular/core';

import { Team } from './team';
import { TeamService } from './team.service';

//import  teams2  from '../asset/ncaaTeamsWrestling.json';

@Component({
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})

export class TeamComponent implements OnInit {
  pageTitle = '2019 NCAA Wrestling Teams';
  sealBaseUrl = 'assets/images/NCAAWrestlingTeams/NCAAWrestlingSchoolSeals/';
  mascotBaseUrl = 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/';
  imageHeight = 25;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTeams = this.listFilter ? this.performFilter(this.listFilter) : this.teams;
  }

  filteredTeams: Team[] = [];
  teams: Team[] = [];
  teams2;

  constructor(
    private teamService: TeamService,
    private myTeams: TeamService
    ) { }

  performFilter(filterBy: string): Team[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.teams.filter((team: Team) =>
      team.teamName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    //console.log(teams2);
    this.teamService.getTeams().subscribe({
      next: teams => {
        this.teams = teams;
        this.filteredTeams = this.teams;
      },
      error: err => this.errorMessage = err
    });
  }
}