import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SplitResult } from '../split-result';
import { SplitterService } from '../splitter.service';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatGridListModule],
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent {
  @ViewChild('euroValue') euroValue!: ElementRef<HTMLInputElement>;
  splitterService = inject(SplitterService);
  data: SplitResult[] = [];
  difference: SplitResult[] = [];
  displayedColumns: string[] = ['billOrCoin', 'count'];

  currentValue: bigint | undefined;
  lastValue: bigint | undefined;
  ranOnce: boolean = false;

  onFormSubmit() {
    let rawValue: string = this.euroValue.nativeElement.value || '0';
    let moneyInCents = this.parseToBigInt(rawValue);
    if (this.currentValue) this.lastValue = this.currentValue;
    this.currentValue = moneyInCents;
    let oldData = this.data;
    this.data = this.splitterService.splitIntoBillsAndCoins(moneyInCents);
    if (this.ranOnce) {
      this.difference = this.splitterService.calculateDifference(oldData, this.data);
    }
    this.ranOnce = true;
  }

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

  formatCentsAsDecimal(cents: bigint | undefined): string {
    if (!cents) return '';
    let stringValue = cents.toString();
    if (stringValue.length < 3) {
      stringValue = stringValue.padStart(3, '0');
    }
    return stringValue.slice(0, stringValue.length - 2) + "," + stringValue.slice(stringValue.length - 2);
  }

  formatDifference(count: bigint): string {
    let result = count.toString();
    if (count > 0) {
      result = '+' + result;
    }
    return result;
  }
}
