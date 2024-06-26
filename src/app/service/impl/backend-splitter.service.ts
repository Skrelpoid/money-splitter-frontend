import { Injectable } from '@angular/core';
import { SplitterService } from '../splitter-service';
import { SplitResult } from '../../split-result';

@Injectable({
  providedIn: 'root'
})
export class BackendSplitterService implements SplitterService {

  private baseUrl = 'https://skrelpoid-money-splitter-backend.onrender.com/money-splitter-backend';
  private splitUrl = this.baseUrl + '/split?money=';
  private diffUrl = this.baseUrl + '/calcDiff';

  constructor() { }

  async splitIntoBillsAndCoins(moneyInCents: bigint): Promise<SplitResult[]> {
    const response = await fetch(this.splitUrl + moneyInCents.toString());
    return await response.json() ?? [];
  }

  async calculateDifference(oldResult: SplitResult[], newResult: SplitResult[]) : Promise<SplitResult[]> {
    const response = await fetch(this.diffUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({oldResult: oldResult, newResult: newResult})
    });
    return await response.json() ?? [];
  }
}
