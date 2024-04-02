import { TestBed } from '@angular/core/testing';

import { CercleService } from './cercle.service';

describe('CercleService', () => {
  let service: CercleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CercleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
