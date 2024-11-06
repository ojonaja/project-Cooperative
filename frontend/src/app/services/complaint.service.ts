import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:3000/api/complaints';

  constructor(private http: HttpClient) {}

  submitComplaint(complaint: { idCard: string; complaintText: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, complaint);
  }

  getAllComplaints(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteComplaint(complaintID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${complaintID}`);
  }
}