import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Entry } from './entry';

export class EntryData implements InMemoryDbService {

  createDb() {
    const entries: Entry[] = [
      {
        id: 1,
        entryName: 'FooBar Usa',
        entryUsername: 'Shane Cross',
        entryPick1: '125',
        entryPick2: '133',
        entryPick3: '141',
        entryPick4: '149',
        entryPick5: '157',
        entryPick6: '165',
        entryPick7: '174',
        entryPick8: '184',
        entryPick9: '197',
        entryPick10: '285',
        entryPick11: '133',
        entryPick12: '141',
        entryPick13: '149',
        entryPick14: '157',
        entryPick15: '165',
        entryPick16: '184',
        entryPoints: 3      },
      {
        id: 2,
        entryName: 'Oregon Kush',
        entryUsername: 'Warren McPherson',
        entryPick1: '125',
        entryPick2: '133',
        entryPick3: '141',
        entryPick4: '149',
        entryPick5: '157',
        entryPick6: '165',
        entryPick7: '174',
        entryPick8: '184',
        entryPick9: '197',
        entryPick10: '285',
        entryPick11: '133',
        entryPick12: '141',
        entryPick13: '149',
        entryPick14: '157',
        entryPick15: '165',
        entryPick16: '184',
        entryPoints: 54
      },
      {
        id: 3,
        entryName: 'Winner Winner Chicken Dinner',
        entryUsername: 'Scott Chapman',
        entryPick1: '125',
        entryPick2: '133',
        entryPick3: '141',
        entryPick4: '149',
        entryPick5: '157',
        entryPick6: '165',
        entryPick7: '174',
        entryPick8: '184',
        entryPick9: '197',
        entryPick10: '285',
        entryPick11: '133',
        entryPick12: '141',
        entryPick13: '149',
        entryPick14: '157',
        entryPick15: '165',
        entryPick16: '184',
        entryPoints: 93      }
    ];
    return { entries };
  }
}
