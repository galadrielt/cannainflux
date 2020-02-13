import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolComponent } from './pool-list.component';

describe('PoolsComponent', () => {
  let component: PoolComponent;
  let fixture: ComponentFixture<PoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
