import { TestBed } from '@angular/core/testing';

import { MoneyHelperService } from './money-helper.service';

describe('MoneyHelperService', () => {
  let service: MoneyHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
