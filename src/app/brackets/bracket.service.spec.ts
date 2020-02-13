import { TestBed } from '@angular/core/testing';

import { BracketService } from './bracket.service';

describe('BracketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BracketService = TestBed.get(BracketService);
    expect(service).toBeTruthy();
  });
});
