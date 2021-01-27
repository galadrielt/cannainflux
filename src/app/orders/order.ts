/* Defines the order entity */
export interface Order {
  //Main Order Information
  id: number;
  orderSport: string;  //wrestling is the only sport now.  More to come.
  orderType: string;  /* tournament is the only Type now. team tournament, match, race, etc*/
  orderName: string;
  orderLocationName?: string;
  orderLocationAddress?: string;
  orderLocationCity?: string;
  orderLocationState?: string;
  orderStartDate?: string;  //Make into just one DateRange?
  orderStartTime?: string;  //More complicated time for multi-day like session breakdowns and times.
  orderEndDate?: string;
  orderEndTime?: string;  //By day or session or something
  orderUrl?:string;  //actual website
  orderImageUrl?: string;  //url to order image logo or UPLOAD FILE url
  orderOrganizerFullName: string;
  orderOrganizerPhone: number;
  orderExtraInstructions: string;
  // End Main Order Information


  //
  orderDivisions?: string[]; /* college is the only level now.  High Schoool, international, youth ... */
  orderLevels?: string[]; /* none (college - only one level for everyone) or white belt (judo/jiu-hitsu/karate/etc) or novice, frosh-soph, JV, Varsity, or 1A, 2A, 3A, 4A etc.*/

  orderBreakdowns?: string[][]; /* by weight class --- 125, 133, 141, 149... */
  orderBracketNumOfParticipantsPerClass?: number[][];  //Number per Breakdown???  Doesn't work for multi order types gymnastics [beam, uneven bars, etc.]
  orderNumOfSeeding: number[][];  //Rest are random

  /* TOURNAMENT - extends Order needed I think*/
  orderTournamentType?: string;  //Team or Individual maybe just a boolean
  orderBracketType: string;  //Double, Single, Pool, Round Robin, Winner takes all(race, gymnastics), Reperage only need this when it is a tournament
  orderPlaceWinners: number;  //create extra brackets for them
  orderBracketNumOfPlacers?: number;  //REPLACES orderPlacerWinners
  orderBracketPlaceDeterminer?: string; //consolation - no comeback, consolation - true winner, consolation - no comback best of 3
  orderBracketPlacerStyle?: string; //1-8 or 1,2,3,3,5,5,7,8 etc.  //orderKeepTeamScore: boolean; //yes or no - needs to know how to do that!

  /*SEEDNING*/
  //orderSeedingNumOfRegions?: number; //1 for wresling, 4 for basketball, etc...
  //orderSeedingNumOfPerRegion?: number;  //REPLACE orderNumOfSeeding
  //orderSeedingPigtails?: number[];  //if none it is random for each breakdown or if NumOfParticipants == NumOfSeeds no need to do it!!!


  /*EVENT LINKS*/
  //orderLinksTo?: string; //Link to a Season or Series orderually

}

/* Match extends Order */
/* Race extends Order */
/* Dual Tournament extends Order */

/*************************************
orderDivisions [] = [Age 6-7, Age 8-9, High School, etc...]
orderLevels [] = [Novice, Open, etc or Belt Ranks?]
orderClasses [] = [weight classes for example] //REPLACE orderBreakdown
*************************************/
