import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketRoundComponent } from './bracket-round.component';

describe('BracketRoundComponent', () => {
  let component: BracketRoundComponent;
  let fixture: ComponentFixture<BracketRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
