// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // แก้ URL นี้ให้เป็น API ของคุณจริงๆ

  constructor(private http: HttpClient) {}

  // สำหรับเข้าสู่ระบบ
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  // สำหรับลงทะเบียนผู้ใช้ใหม่
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  // สำหรับการส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของผู้ใช้
  sendResetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  // ฟังก์ชันจัดการข้อผิดพลาด
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error เกิดจากฝั่ง client เช่น อินเตอร์เน็ตมีปัญหา
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error เกิดจากฝั่ง server เช่น API ไม่ตอบสนอง
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}