import { TestBed } from '@angular/core/testing';

import { VariableGService } from './variable-g.service';

describe('VariableGService', () => {
  let service: VariableGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
