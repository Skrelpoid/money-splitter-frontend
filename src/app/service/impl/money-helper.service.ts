import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyHelperService {

  constructor() { }

  
  parseToBigInt(rawValue: string): bigint {
    let parts: string[] = rawValue.split('.');
    let euros = parts[0];
    let decimalPart = parts.length >= 2 ? parts[1] : '0';
    let cents = this.toCents(decimalPart);
    return BigInt(`${euros}${cents}`);
  }

  toCents(decimalPart: string): string {
    if (!decimalPart || decimalPart === '0') {
      return '00';
    }
    if (decimalPart.length == 1) {
      return `${decimalPart}0`;
    }
    if (decimalPart.length > 2) {
      return decimalPart.substring(0, 2);
    }
    return decimalPart;
  }

  formatCentsAsDecimal(cents: string | bigint | undefined): string {
    if (!cents) return '';
    let stringValue = cents.toString();
    if (stringValue.length < 3) {
      stringValue = stringValue.padStart(3, '0');
    }
    return stringValue.slice(0, stringValue.length - 2) + "," + stringValue.slice(stringValue.length - 2);
  }

  formatDifference(count: bigint | string ): string {
    let result = count.toString();
    if (BigInt(result) > 0) {
      result = '+' + result;
    }
    return result;
  }
}
