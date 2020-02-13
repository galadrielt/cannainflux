import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Sport } from './sport';

export class SportData implements InMemoryDbService {

  createDb() {
    const sports: Sport[] = [
      {
        id: 1,
        sportName: 'Wrestling',
        sportType: 'physical',
        sportParticipants: 'wrestlers', 
        sportDivisions: 'Age',
        sportLevels: 'Experience',
        sportBreakdowns: 'Weight Classes'
      }
    ];
    return { sports };
  }
}
