import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Team } from './team';

export class TeamData implements InMemoryDbService {

  createDb() {
    const teams: Team[] = [
      {
        id: 1,
        teamSealUrl: 'AmericanUniversity.png',
        teamName: 'American University',
        teamAbbreviation: 'AU',
        teamMascotUrl: 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/200px-American_Eagles_logo.svg.png', 
        teamMascotName: 'Eagles',
        teamConference: 'EIWA',
        teamCity: 'Washington',
        teamState: 'DC'
      },
      {
        id: 2,
        teamSealUrl: 'AppalachianStateUniversity.png',
        teamName: 'Appalachian State',
        teamAbbreviation: 'APP',
        teamMascotUrl: 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/150px-Appalachian_State_Mountaineers_logo.svg.png', 
        teamMascotName: 'Mountaineers',
        teamConference: 'SoConn',
        teamCity: 'Boone',
        teamState: 'NC'
      },
      {
        id: 3,
        teamSealUrl: '150px-Stanford_University_seal_2003.svg.png',
        teamName: 'Stanford University',
        teamAbbreviation: 'STAN',
        teamMascotUrl: 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/118px-Stanford_Cardinal_logo.svg.png', 
        teamMascotName: 'Cardinal',
        teamConference: 'Pac 12',
        teamCity: 'Stanford',
        teamState: 'CA'
      },
      {
        id: 4,
        teamSealUrl: '150px-University_of_Iowa_seal.svg.png',
        teamName: 'Iowa',
        teamAbbreviation: 'IOWA',
        teamMascotUrl: 'assets/images/NCAAWrestlingTeams/NCAAWrestlingMascotLogo/Iowa_Hawkeyes_logo.svg.png',  
        teamMascotName: 'Hawkeyes',
        teamConference: 'Big Ten',
        teamCity: 'Iowa City',
        teamState: 'IA'
      }
    ];
    return { teams };
  }
}
