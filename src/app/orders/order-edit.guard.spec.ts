import { TestBed, async, inject } from '@angular/core/testing';

import { OrderEditGuard } from './order-edit.guard';

describe('OrderEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEditGuard]
    });
  });

  it('should ...', inject([OrderEditGuard], (guard: OrderEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
