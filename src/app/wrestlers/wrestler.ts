/* Defines the a wrestling wrestler entity */
export interface Wrestler {
    id: number;
    wrestlerFirstName: string;
    wrestlerMiddleName?: string;
    wrestlerLastName: string;
    wrestlerWeight: string;
    wrestlerCollege: string;
    wrestlerYearCollege?: string;
    wrestlerHeight?: string;
    wrestlerHometownCity?: string;
    wrestlerHometownState?: string;
    wrestlerHighSchool?: string;
    wrestlerMajor?: string;
    wrestlerWins?: number;
    wrestlerLoses?: number;
    wrestlerImageUrl?: string;
    wrestlersBio?: string;
   }
   