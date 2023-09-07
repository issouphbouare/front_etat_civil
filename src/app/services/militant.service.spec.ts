import { TestBed } from '@angular/core/testing';

import { MilitantService } from './militant.service';

describe('MilitantService', () => {
  let service: MilitantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilitantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
