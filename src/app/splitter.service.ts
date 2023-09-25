import { Injectable } from '@angular/core';
import { SplitResult } from './split-result';

@Injectable({
  providedIn: 'root'
})
export class SplitterService {

  billsAndCoins: bigint[] = [
    20000n,
    10000n,
    5000n,
    2000n,
    1000n,
    500n,
    200n,
    100n,
    50n,
    20n,
    10n,
    5n,
    2n,
    1n,
  ]

  constructor() { }

  splitIntoBillsAndCoins(moneyInCents: bigint): SplitResult[] {
    let result: SplitResult[] = [];
    for (const billOrCoin of this.billsAndCoins) {
      let count = moneyInCents / billOrCoin;
      moneyInCents = moneyInCents % billOrCoin;
      if (count !== 0n) {
        result.push({ billOrCoin: billOrCoin, count: count });
      }
    }
    return result;
  }

  calculateDifference(oldResult: SplitResult[], newResult: SplitResult[]) : SplitResult[] {
    let result: SplitResult[] = [];
    let oldMap = new Map(oldResult.map(i => [i.billOrCoin, i.count]));
    let newMap = new Map(newResult.map(i => [i.billOrCoin, i.count]));

    let keys = [...new Set([...oldMap.keys(), ...newMap.keys()])];
    keys.sort((a, b) => Number(b - a));

    for (const billOrCoin of keys) {
      let oldValue = oldMap.get(billOrCoin) ?? 0n;
      let newValue = newMap.get(billOrCoin) ?? 0n;
      let difference = newValue - oldValue;
      result.push({billOrCoin: billOrCoin, count: difference});
    }

    return result;
  }
}
