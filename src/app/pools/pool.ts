/* Defines the a betting pool entity */
export interface Pool {
    id: number;  // unique id for each pool not editable by user

    // for Pool Details
    eventLinkId: number;
    poolName: string;
    poolDeadlineDate: string;
    poolType: string;
    poolEntryAmount: number;
    poolTotalEntriesAllowed: number;
    poolPaymentBreakdown: string;
    
    // for Pool design splash page
    poolImageUrlBackground: string;
    poolImageUrlMain: string;

    // for Event Organizer but eventually this will grab user id and have information stored
    poolOrganizer: string;
    poolOrganizerPhone: string;
    poolInviteEmails: string;

  }
