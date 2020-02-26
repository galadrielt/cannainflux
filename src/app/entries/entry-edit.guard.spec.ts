import { TestBed, async, inject } from '@angular/core/testing';

import { EntryEditGuard } from './entry-edit.guard';

describe('EntryEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryEditGuard]
    });
  });

  it('should ...', inject([EntryEditGuard], (guard: EntryEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
