import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComponent } from './sport-list.component';

describe('SportsComponent', () => {
  let component: SportComponent;
  let fixture: ComponentFixture<SportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
