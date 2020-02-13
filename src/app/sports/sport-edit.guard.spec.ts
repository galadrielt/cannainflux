import { TestBed, async, inject } from '@angular/core/testing';

import { SportEditGuard } from './sport-edit.guard';

describe('SportEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportEditGuard]
    });
  });

  it('should ...', inject([SportEditGuard], (guard: SportEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
