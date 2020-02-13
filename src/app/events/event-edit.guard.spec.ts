import { TestBed, async, inject } from '@angular/core/testing';

import { EventEditGuard } from './event-edit.guard';

describe('EventEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventEditGuard]
    });
  });

  it('should ...', inject([EventEditGuard], (guard: EventEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
