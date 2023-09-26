import { TestBed } from '@angular/core/testing';

import { BackendSplitterServiceService } from './backend-splitter.service';

describe('BackendSplitterServiceService', () => {
  let service: BackendSplitterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendSplitterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
