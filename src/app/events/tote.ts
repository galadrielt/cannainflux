/* Defines the tote entity */
export interface Tote {
    id: number;
    totePoolName: string;
    toteDeadlineDate: string;
    toteDeadlineTime: string;
    toteEventImageUrl: string;  //need some other things to make it sexy
    toteSecondImageUrl: string;
    toteType: string;  /* pick'em, straight-up, pool play */
    toteBracketSize: number;
    toteNumOfToters: number;
    totePrize: number;
    totePrizeBreakdown: string;  //winner takes all, top 3 payout breakdowns
    toteExtraInstructions: string; //
  }