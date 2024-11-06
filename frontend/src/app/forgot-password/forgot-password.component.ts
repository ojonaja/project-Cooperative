import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      idCard: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email, idCard, newPassword, confirmPassword } = this.forgotPasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        this.successMessage = null;
        return;
      }
      this.authService.resetPassword(email, idCard, newPassword).subscribe(
        response => {
          this.successMessage = 'Password reset successfully';
          this.errorMessage = null;
          this.forgotPasswordForm.reset();
        },
        error => {
          this.errorMessage = 'Error resetting password';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly';
      this.successMessage = null;
    }
  }
}