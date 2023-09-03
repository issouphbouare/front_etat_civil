import { TestBed } from '@angular/core/testing';

import { FileDBService } from './file-db.service';

describe('FileDBService', () => {
  let service: FileDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
