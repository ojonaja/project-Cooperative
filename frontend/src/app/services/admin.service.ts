import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getUserTransactions(idCard: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/${idCard}`);
  }

  getAllComplaints(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/complaints`);
  }
}