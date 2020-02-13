import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'pm-bracket-match',
  templateUrl: './bracket-match.component.html',
  styleUrls: ['./brackets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BracketMatchComponent implements OnInit{
  
  // @Input() matchHeight:string;
  // @Input() matchVertical:string;

  constructor() {
   }

  ngOnInit() {
    //console.log("ONINIT:", this.matchHeight);  
  }

  // getMatchStyle() {
  //   let styles = {
  //     'height': this.matchHeight + 'px',
  //     'top': this.matchVertical + '%'
  //   };
  //   console.log("Variables:", this.matchHeight, this.matchVertical);
  //   return styles;

  // }
  
}
