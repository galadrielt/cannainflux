import { TestBed, async, inject } from '@angular/core/testing';

import { WrestlerEditGuard } from './wrestler-edit.guard';

describe('WrestlerEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WrestlerEditGuard]
    });
  });

  it('should ...', inject([WrestlerEditGuard], (guard: WrestlerEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
