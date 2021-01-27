import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `

    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand' routerLinkActive='active'
      [routerLink]="['/welcome']">Canna<span style="color:green;">Influx</span></a>
      <ul class='navbar-nav'>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/orders']">Orders</a>
      </li>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/wrestlers']">Products</a>
      </li>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/teams']">Dispensaries</a>
      </li>
      <!--<li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/brackets']">Brackets</a>
      </li>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/brackets']">Matches</a>
      </li>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/pools']">Pools</a>
      </li>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
        [routerLink]="['/entries']">Entries</a>
      </li>-->
    </ul>

      <ul class='navbar-nav ml-auto'>
      <li class='nav-item topnav-right'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
      [routerLink]="['/signup']">Users</a>
      </li>
        <li class='nav-item topnav-right'><button class="btn btn-outline-success" type="button" routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
        [routerLink]="['/entries', '2', '0', 'edit']">Get Started</button>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'MatMadness';
  pageLogo = './assets/images/matmadness-logo.png';
}
