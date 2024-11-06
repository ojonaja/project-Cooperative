import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../services/complaint.service';

@Component({
  selector: 'app-admin-complaints',
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent implements OnInit {
  complaints: any[] = [];
  errorMessage: string | null = null;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.getComplaints();
  }

  getComplaints() {
    this.complaintService.getAllComplaints().subscribe(
      response => {
        this.complaints = response;
      },
      error => {
        this.errorMessage = 'Error fetching complaints';
      }
    );
  }

  deleteComplaint(complaintID: number) {
    this.complaintService.deleteComplaint(complaintID).subscribe(
      response => {
        this.getComplaints(); // Refresh the list after deletion
      },
      error => {
        this.errorMessage = 'Error deleting complaint';
      }
    );
  }
}