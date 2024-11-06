import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  getUserTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }
}