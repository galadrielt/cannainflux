import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pm-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BracketsComponent implements OnInit {
  classes = {
    weights: [
    '125', '133', '141', '149', '157', '165', '174', '184', '197', '285'
  ]};


  math = Math;
  tournament: any;
  match: any;

  entries: number = 32;
  roundnum: number = 1;
  roundCat = new String ('round-');
  roundCl: string = "round";

  roundHtmlStr = new String ('');
  roundStyles = {
    'width': '150px',
    'margin-right': '40px'
  };



  constructor(
  ) { }

  ngOnInit() {
    this.match = {
      logo: '(o)',
      seed: 32,
      name: 'Y. Diakomaholis',
      affiliate: 'stan',
      score: 2
    };

    this.tournament = {
      teams : [
        ['Scott Chapman',  'Team 8' ],
        ['Team 5',  'Team 4' ],
        ['Team 3',  'Joe Dirt' ],
        ['Team 7',  'Team 2' ]
      ],
      results : [[ /* WINNER BRACKET */
        [[1,2], [3,4], [5,6], [7,8]],
        [[9,1], [8,2]],
        [[1,3]]
      ], [         /* LOSER BRACKET */
        [[5,1], [1,2], [3,2], [6,9]],
        [[1,2], [3,1]],
        [[4,2]]
      ]]
    }
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

  getRoundHtml (indexR){
    this.roundHtmlStr = '';
    console.log("INDEXR:", indexR);
    for (let i = 0; i < this.entries/Math.pow(2,indexR); i++){
    this.roundHtmlStr = this.roundHtmlStr + `
         <li class="spacer">&nbsp;</li>\n
         <li class="game game-top winner">Creighton <span>50</span></li>\n
         <li class="game game-spacer">&nbsp;</li>\n
         <li class="game game-bottom">Harvard <span>40</span></li>\n
         <li class="spacer">&nbsp;</li>\n
         `;
    }
    console.log("HTML:", this.roundHtmlStr.toString());
    return(this.roundHtmlStr);
  }
  ngAfterContentInit() {

  }
}
