import { Injectable } from '@angular/core';
import { SplitResult } from '../../split-result';
import { SplitterService } from '../splitter-service';

@Injectable({
  providedIn: 'root'
})
export class FrontendSplitterService implements SplitterService {

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

  async splitIntoBillsAndCoins(moneyInCents: bigint): Promise<SplitResult[]> {
    let result: SplitResult[] = [];
    for (const billOrCoin of this.billsAndCoins) {
      let count = moneyInCents / billOrCoin;
      moneyInCents = moneyInCents % billOrCoin;
      if (count !== 0n) {
        result.push({ billOrCoin: billOrCoin.toString(), count: count.toString() });
      }
    }
    return result;
  }

  async calculateDifference(oldResult: SplitResult[], newResult: SplitResult[]) : Promise<SplitResult[]> {
    let result: SplitResult[] = [];
    let oldMap = new Map(oldResult.map(i => [i.billOrCoin, i.count]));
    let newMap = new Map(newResult.map(i => [i.billOrCoin, i.count]));

    let keys = [...new Set([...oldMap.keys(), ...newMap.keys()])];
    keys.sort((a, b) => Number(BigInt(b) - BigInt(a)));

    for (const billOrCoin of keys) {
      let oldValue = oldMap.get(billOrCoin.toString()) ?? '0';
      let newValue = newMap.get(billOrCoin.toString()) ?? '0';
      let difference = BigInt(newValue) - BigInt(oldValue);
      result.push({billOrCoin: billOrCoin.toString(), count: difference.toString()});
    }

    return result;
  }
}
