import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent {
  interestForm: FormGroup;
  interestResult: number | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.interestForm = this.fb.group({
      principal: ['', [Validators.required, Validators.min(0)]],
      rate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      time: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.interestForm.valid) {
      const { principal, rate, time } = this.interestForm.value;
      this.interestResult = this.calculateInterest(principal, rate, time);
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Please fill out the form correctly';
      this.interestResult = null;
    }
  }

  calculateInterest(principal: number, rate: number, time: number): number {
    return principal * (rate / 100) * time;
  }
}