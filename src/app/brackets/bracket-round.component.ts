import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'pm-bracket-round',
  templateUrl: './bracket-round.component.html',
  styleUrls: ['./brackets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BracketRoundComponent implements OnInit {

  entries: number = 16;
  roundnum: number = 1;
  roundCat = new String ('round-');
  roundCl: string = "round";

  
  roundStyles = {
    'width': '150px',
    'margin-right': '40px'
  };
  constructor() { }

  ngOnInit() {
  }

  getRoundClasses(i){
    i = i + 1;
    console.log(this.roundCl.concat(" ".concat(this.roundCat.concat(i))));
    return(this.roundCl.concat(" ".concat(this.roundCat.concat(i))));
  }

  getRounds(){
    console.log("ROUND:", Math.log(this.entries)/Math.log(2));
    this.roundnum = Math.log(this.entries)/Math.log(2);
    return [].constructor(Math.log(this.entries)/Math.log(2));
  }
  
  getVertical(vn, vm){
    console.log("Vertical Height:", vn, vm, vm*25+15);
    //if vr.length == 8 or 7 or 6 or 5 or 4 or 3 or 2 or 1
    if (vn+1==7){
      return vm*960+487.5
    }else{  
      if (vn+1==6){
          return vm*480+247.5
      }else{
        if (vn+1==5){
          return vm*240+127.5
        }else{
          if (vn+1==4){
            return vm*120+67.5
          }else{
            if (vn+1==3){
              return vm*60+37.5
            }else{
              if (vn+1==2){
                return vm*30+22.5
              }else{
                if (vn+1==1){
                  return vm*15+15;
                }
              }
            }
          }
        }
      }
    }
    //return "41";
  }
  getMatches(roundIndex){
    roundIndex = roundIndex + 1;
    console.log("Internal ROUND:", roundIndex);
    console.log("Matches:", this.entries/Math.pow(2,roundIndex));
    return [].constructor(this.entries/Math.pow(2,roundIndex));
  }
  
}
