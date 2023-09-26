import { Component, ElementRef, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SplitResult } from '../split-result';
import { MatTableModule } from '@angular/material/table';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MoneyHelperService } from '../service/impl/money-helper.service';
import { ImplementationSwitcherService } from '../service/impl/implementation-switcher.service';
import { NotifierService } from 'angular-notifier';

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
    MatChipsModule,],
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent {
  @ViewChild('euroValue') euroValue!: ElementRef<HTMLInputElement>;

  notifierService = inject(NotifierService);
  implementationSwitcher = inject(ImplementationSwitcherService);
  moneyHelper = inject(MoneyHelperService);
  data: SplitResult[] = [];
  difference: SplitResult[] = [];
  displayedColumns: string[] = ['billOrCoin', 'count'];

  currentValue: bigint | undefined;
  lastValue: bigint | undefined;
  ranOnce: boolean = false;

  onFormSubmit() {
    let splitterService = this.implementationSwitcher.getImplementation();
    let rawValue: string = this.euroValue.nativeElement.value || '0';
    let moneyInCents = this.moneyHelper.parseToBigInt(rawValue);
    if (this.currentValue) this.lastValue = this.currentValue;
    this.currentValue = moneyInCents;
    let oldData = this.data;
    splitterService.splitIntoBillsAndCoins(moneyInCents)
      .then(result => {
        this.data = result;
        if (this.ranOnce) {
          splitterService.calculateDifference(oldData, this.data)
            .then(result => this.difference = result)
            .catch(e => this.notifierService.notify('error', 'Fehler! Bitte versuchen Sie es später erneut'));
        }
        this.ranOnce = true;
      }).catch(e => this.notifierService.notify('error', 'Fehler! Bitte versuchen Sie es später erneut'));
  }

  handleChipSelection(event: MatChipSelectionChange) {
    let chip = event.source;

    let id = chip.id;
    if (id === 'frontendChip') {
      this.implementationSwitcher.switchToFrontend();
    } else if (id === 'backendChip') {
      this.implementationSwitcher.switchToBackend();
    }
  }
}
