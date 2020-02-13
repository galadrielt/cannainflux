import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetailComponent } from './sport-detail.component';

describe('SportDetailComponent', () => {
  let component: SportDetailComponent;
  let fixture: ComponentFixture<SportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
