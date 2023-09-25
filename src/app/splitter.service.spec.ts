import { TestBed } from '@angular/core/testing';

import { SplitterService } from './splitter.service';

describe('SplitterService', () => {
  let service: SplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Split test for 388,88', () => {
    let input = 38888n;
    let expectedResult = [
      { billOrCoin: 20000n, count: 1n },
      { billOrCoin: 10000n, count: 1n },
      { billOrCoin: 5000n, count: 1n },
      { billOrCoin: 2000n, count: 1n },
      { billOrCoin: 1000n, count: 1n },
      { billOrCoin: 500n, count: 1n },
      { billOrCoin: 200n, count: 1n },
      { billOrCoin: 100n, count: 1n },
      { billOrCoin: 50n, count: 1n },
      { billOrCoin: 20n, count: 1n },
      { billOrCoin: 10n, count: 1n },
      { billOrCoin: 5n, count: 1n },
      { billOrCoin: 2n, count: 1n },
      { billOrCoin: 1n, count: 1n },
    ]
    let result = service.splitIntoBillsAndCoins(input);
    expect(result).toEqual(expectedResult);
  });
});
