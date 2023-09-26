import { SplitResult } from "../split-result";

export interface SplitterService {
    splitIntoBillsAndCoins(moneyInCents: bigint): Promise<SplitResult[]>;
    calculateDifference(oldResult: SplitResult[], newResult: SplitResult[]) : Promise<SplitResult[]>;
}
