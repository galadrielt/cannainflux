import { TestBed, async, inject } from '@angular/core/testing';

import { PoolEditGuard } from './pool-edit.guard';
describe('PoolEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoolEditGuard]
    });
  });

  it('should ...', inject([PoolEditGuard], (guard: PoolEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
