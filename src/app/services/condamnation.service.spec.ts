import { TestBed } from '@angular/core/testing';

import { CondamnationService } from './condamnation.service';

describe('CondamnationServiceService', () => {
  let service: CondamnationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondamnationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
