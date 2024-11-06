import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      response => {
        this.profileForm.patchValue(response);
      },
      error => {
        this.errorMessage = 'Error fetching profile';
        console.error('Error fetching profile:', error);
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        response => {
          this.successMessage = 'Profile updated successfully';
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = 'Error updating profile';
          this.successMessage = null;
          console.error('Error updating profile:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly';
      this.successMessage = null;
    }
  }
}