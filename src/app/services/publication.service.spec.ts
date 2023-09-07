import { TestBed } from '@angular/core/testing';

import { AvancementService } from './document.service';

describe('PublicationService', () => {
  let service: AvancementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvancementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
