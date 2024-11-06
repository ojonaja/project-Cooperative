import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private apiUrl = 'http://localhost:3000/api/accountbook'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  updateBalance(amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateBalance`, { amount });
  }

  getTotalBalance(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalBalance`);
  }
}