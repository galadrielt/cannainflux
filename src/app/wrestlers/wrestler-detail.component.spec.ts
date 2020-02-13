import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerDetailComponent } from './wrestler-detail.component';

describe('WrestlerDetailComponent', () => {
  let component: WrestlerDetailComponent;
  let fixture: ComponentFixture<WrestlerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrestlerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrestlerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
