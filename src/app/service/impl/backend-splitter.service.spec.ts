import { TestBed } from '@angular/core/testing';

import { BackendSplitterService } from './backend-splitter.service';

describe('BackendSplitterService', () => {
  let service: BackendSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
