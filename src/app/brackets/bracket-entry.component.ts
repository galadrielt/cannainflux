import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'pm-bracket-entry',
  templateUrl: './bracket-entry.component.html',
  styleUrls: ['./brackets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BracketEntryComponent implements OnInit {
  
  //@Input('match') match: any;
  @Input() tournament: any;
  @Input() roundPosition: string;
  @Input() winner: string;

  matchCl: string = "game";
  
  match: any;
  constructor() {
      

   }

  ngOnInit() {
    this.match = {
      logo: '(o)',
      seed: 32,
      name: 'Yanni Diakomahol', 
      affiliate: 'stan',
      score: 2
  };
    console.log(this.match)
    console.log(this.tournament);
  }


  getEntryClasses(){
    if (!this.roundPosition){
      if (this.winner){
        return(this.matchCl.concat(" ".concat("game-top".concat(" ".concat("winner")))));
      }else{
        return(this.matchCl.concat(" ".concat("game-top")));
      } 
    }else{
      if (this.winner){
        return(this.matchCl.concat(" ".concat("game-bottom".concat(" ".concat("winner")))));
      }else{
      return(this.matchCl.concat(" ".concat("game-bottom"))); 
      }
    }
       
  }
}
