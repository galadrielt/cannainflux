import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToteComponent } from './tote.component';

describe('ToteComponent', () => {
  let component: ToteComponent;
  let fixture: ComponentFixture<ToteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
