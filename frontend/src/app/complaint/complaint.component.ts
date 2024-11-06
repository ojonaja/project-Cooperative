import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  complaintForm: FormGroup;
  name: string | null = null;
  email: string | null = null;
  idCard: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private profileService: ProfileService
  ) {
    this.complaintForm = this.fb.group({
      complaint: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      (response: any) => {
        this.name = response.name;
        this.email = response.email;
        this.idCard = response.idCard;
      },
      (error: any) => {
        this.errorMessage = 'Error fetching profile';
        console.error('Error fetching profile:', error);
      }
    );
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      const complaintText = this.complaintForm.value.complaint;
      if (this.idCard) {
        this.complaintService.submitComplaint({ idCard: this.idCard, complaintText }).subscribe(
          (response: any) => {
            this.successMessage = 'Complaint submitted successfully';
            this.errorMessage = null;
            this.complaintForm.reset();
          },
          (error: any) => {
            this.errorMessage = 'Error submitting complaint';
            this.successMessage = null;
            console.error('Error submitting complaint:', error);
          }
        );
      } else {
        this.errorMessage = 'ID Card not found';
        this.successMessage = null;
      }
    } else {
      this.errorMessage = 'Please fill out the complaint';
      this.successMessage = null;
    }
  }
}