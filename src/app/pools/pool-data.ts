import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Pool } from './pool';

export class PoolData implements InMemoryDbService {
 createDb() {
    const pools: Pool[] = [
      {
        id: 1,
        poolName: 'BayArea Brawlers',
        poolDeadlineDate: '2017-03-19T15:59:59.000Z',
        poolImageUrlBackground: 'assets/images/male.png',
        poolImageUrlMain: 'assets/images/male.png',
        poolType: 'Pick Team (16 Seeds)',
        poolPaymentBreakdown: '1-3',
        poolEntryAmount: 20,
        poolTotalEntriesAllowed: 30,
        poolOrganizer: 'Scott Chapman',
        poolOrganizerPhone: '4055551234',
        eventLinkId: 1,
        poolInviteEmails: 'scottbchapman@gmail.com,ninjajilly@gmail.com',
      },
      {
        id: 2,
        poolName: 'BayArea Brawlers',
        poolDeadlineDate: '2018-03-19T15:59:59.000Z',
        poolImageUrlBackground: 'assets/images/male.png',
        poolImageUrlMain: 'assets/images/male.png',
        poolType: 'Pick Team (16 Seeds)',
        poolPaymentBreakdown: '1-3',
        poolEntryAmount: 30,
        poolTotalEntriesAllowed: 30,
        poolOrganizer: 'Scott Chapman',
        poolOrganizerPhone: '4055551234',
        eventLinkId: 1,
        poolInviteEmails: 'scottbchapman@gmail.com,ninjajilly@gmail.com',
      },
      {
        id: 3,
        poolName: 'BayArea Brawlers',
        poolDeadlineDate: '2019-03-19T15:59:59.000Z',
        poolImageUrlBackground: 'assets/images/male.png',
        poolImageUrlMain: 'assets/images/male.png',
        poolType: 'Pick Team (16 Seeds)',
        poolPaymentBreakdown: '1-3',
        poolEntryAmount: 30,
        poolTotalEntriesAllowed: 30,
        poolOrganizer: 'Scott Chapman',
        poolOrganizerPhone: '4055551234',
        eventLinkId: 1,
        poolInviteEmails: 'scottbchapman@gmail.com,ninjajilly@gmail.com',
      },
      {
        id: 4,
        poolName: 'BayArea Brawlers',
        poolDeadlineDate: '2019-03-19T15:59:59.000Z',
        poolImageUrlBackground: 'assets/images/male.png',
        poolImageUrlMain: 'assets/images/male.png',
        poolType: 'Pick Team (16 Seeds)',
        poolPaymentBreakdown: '1-3',
        poolEntryAmount: 30,
        poolTotalEntriesAllowed: 30,
        poolOrganizer: 'Scott Chapman',
        poolOrganizerPhone: '4055551234',
        eventLinkId: 1,
        poolInviteEmails: 'scottbchapman@gmail.com,ninjajilly@gmail.com',
      }
    ];
    return { pools };
  }
}
