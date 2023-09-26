import { SplitResult } from "../split-result";

export interface SplitterService {
    /**
     * Split the given money in cents into bills and coins
     * @param moneyInCents money amount in cents
     * @returns A Promise of an array of SplitResults, which hold the bill or coin and the amount for that bill or coin
     */
    splitIntoBillsAndCoins(moneyInCents: bigint): Promise<SplitResult[]>;

    /**
     * Caclulate the difference between the two Split Result arrays. Calculates new - old
     * @param oldResult the old result
     * @param newResult the new result
     * @returns A Promise of an array of SplitResults, which hold the bill or coin and the difference for that bill or coin
     */
    calculateDifference(oldResult: SplitResult[], newResult: SplitResult[]) : Promise<SplitResult[]>;
}
