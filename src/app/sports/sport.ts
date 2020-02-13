/* Defines the a wrestling team entity */
export interface Sport {
    id: number;
    sportName: string;
    sportType: "physical" | "motorized" | "mind" | "with animal" | "";
    sportParticipants: string;
    sportDivisions?: string;
    sportLevels?: string;
    sportBreakdowns?: string;
   }
   