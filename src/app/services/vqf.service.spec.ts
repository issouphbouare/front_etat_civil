import { TestBed } from '@angular/core/testing';

import { VqfService } from './vqf.service';

describe('VqfService', () => {
  let service: VqfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VqfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
