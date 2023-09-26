import { TestBed } from '@angular/core/testing';

import { ImplementationSwitcherService } from './implementation-switcher.service';

describe('ImplementationSwitcherService', () => {
  let service: ImplementationSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplementationSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
