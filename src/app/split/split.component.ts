import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent {
  @ViewChild('euroValue') euroValue! : ElementRef<HTMLInputElement>;

  onFormSubmit() {
    let nativeValue : string = this.euroValue.nativeElement.value || '0';
    console.log("native: " + nativeValue);
    console.log("native type: " + typeof nativeValue);
    console.log(BigInt(nativeValue));
  }
}
