import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Ensure this path is correct
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showRegisterForm: boolean = false;
  showForgotPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // เปลี่ยน username เป็น email
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // เปลี่ยน username เป็น email
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  // login.component.ts
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']); // Change this to your home route
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบอีเมลและรหัสผ่านของคุณ';
        }
      );
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value; // ใช้ email แทน username
      this.authService.register(email, password).subscribe(
        (response: any) => {
          this.errorMessage = 'สมัครสมาชิกสำเร็จ!';
          this.showRegisterForm = false; // ปิดฟอร์มสมัครสมาชิก
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'สมัครสมาชิกล้มเหลว กรุณาลองใหม่อีกครั้ง';
        }
      );
    }
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showForgotPassword = false; // ปิดฟอร์มลืมรหัสผ่าน
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
    this.showRegisterForm = false; // ปิดฟอร์มสมัครสมาชิก
  }
}