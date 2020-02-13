import { TestBed, async, inject } from '@angular/core/testing';

import { TeamEditGuard } from './team-edit.guard';

describe('TeamEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamEditGuard]
    });
  });

  it('should ...', inject([TeamEditGuard], (guard: TeamEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
