import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // ต้องแน่ใจว่ามีการประกาศที่นี่
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
