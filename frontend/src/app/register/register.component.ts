// register component .ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      idCard: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.registerForm.valid) {
      const memberData = this.registerForm.value;
      console.log('Submitting member data:', memberData); // ตรวจสอบข้อมูลที่จะส่ง
      this.registerService.registerMember(memberData).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    } else {
      console.error('Form is invalid:', this.registerForm.errors); // ตรวจสอบความถูกต้องของฟอร์ม
    }
  }
}

