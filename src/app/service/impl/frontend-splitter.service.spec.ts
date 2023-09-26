import { TestBed } from '@angular/core/testing';

import { FrontendSplitterService } from './frontend-splitter.service';

describe('FrontendSplitterService', () => {
  let service: FrontendSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontendSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Split test for 388,88', async () => {
    let input = 38888n;
    let expectedResult = [
      { billOrCoin: '20000', count: '1' },
      { billOrCoin: '10000', count: '1' },
      { billOrCoin: '5000', count: '1' },
      { billOrCoin: '2000', count: '1' },
      { billOrCoin: '1000', count: '1' },
      { billOrCoin: '500', count: '1' },
      { billOrCoin: '200', count: '1' },
      { billOrCoin: '100', count: '1' },
      { billOrCoin: '50', count: '1' },
      { billOrCoin: '20', count: '1' },
      { billOrCoin: '10', count: '1' },
      { billOrCoin: '5', count: '1' },
      { billOrCoin: '2', count: '1' },
      { billOrCoin: '1', count: '1' },
    ]
    let result = await service.splitIntoBillsAndCoins(input);
    expect(result).toEqual(expectedResult);
  });
});
