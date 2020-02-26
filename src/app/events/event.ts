/* Defines the event entity */
export interface Event {
  //Main Event Information
  id: number;
  eventSport: string;  //wrestling is the only sport now.  More to come.
  eventType: string;  /* tournament is the only Type now. team tournament, match, race, etc*/
  eventName: string;
  eventLocationName?: string;
  eventLocationAddress?: string;
  eventLocationCity?: string;
  eventLocationState?: string;
  eventStartDate?: string;  //Make into just one DateRange?
  eventStartTime?: string;  //More complicated time for multi-day like session breakdowns and times.
  eventEndDate?: string; 
  eventEndTime?: string;  //By day or session or something
  eventUrl?:string;  //actual website
  eventImageUrl?: string;  //url to event image logo or UPLOAD FILE url
  eventOrganizerFullName: string;
  eventOrganizerPhone: number;
  eventExtraInstructions: string;
  // End Main Event Information


  // 
  eventDivisions?: string[]; /* college is the only level now.  High Schoool, international, youth ... */
  eventLevels?: string[]; /* none (college - only one level for everyone) or white belt (judo/jiu-hitsu/karate/etc) or novice, frosh-soph, JV, Varsity, or 1A, 2A, 3A, 4A etc.*/
  
  eventBreakdowns?: string[][]; /* by weight class --- 125, 133, 141, 149... */
  eventBracketNumOfParticipantsPerClass?: number[][];  //Number per Breakdown???  Doesn't work for multi event types gymnastics [beam, uneven bars, etc.]
  eventNumOfSeeding: number[][];  //Rest are random
  
  /* TOURNAMENT - extends Event needed I think*/
  eventTournamentType?: string;  //Team or Individual maybe just a boolean
  eventBracketType: string;  //Double, Single, Pool, Round Robin, Winner takes all(race, gymnastics), Reperage only need this when it is a tournament
  eventPlaceWinners: number;  //create extra brackets for them
  eventBracketNumOfPlacers?: number;  //REPLACES eventPlacerWinners
  eventBracketPlaceDeterminer?: string; //consolation - no comeback, consolation - true winner, consolation - no comback best of 3
  eventBracketPlacerStyle?: string; //1-8 or 1,2,3,3,5,5,7,8 etc.  //eventKeepTeamScore: boolean; //yes or no - needs to know how to do that!
  
  /*SEEDNING*/
  //eventSeedingNumOfRegions?: number; //1 for wresling, 4 for basketball, etc...
  //eventSeedingNumOfPerRegion?: number;  //REPLACE eventNumOfSeeding
  //eventSeedingPigtails?: number[];  //if none it is random for each breakdown or if NumOfParticipants == NumOfSeeds no need to do it!!!


  /*EVENT LINKS*/
  //eventLinksTo?: string; //Link to a Season or Series eventually

}

/* Match extends Event */
/* Race extends Event */
/* Dual Tournament extends Event */

/*************************************
eventDivisions [] = [Age 6-7, Age 8-9, High School, etc...]
eventLevels [] = [Novice, Open, etc or Belt Ranks?]
eventClasses [] = [weight classes for example] //REPLACE eventBreakdown
*************************************/