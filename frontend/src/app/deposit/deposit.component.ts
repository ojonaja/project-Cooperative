import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositAmount: number = 0;
  depositHistory: { date: string; amount: number }[] = [];
  message: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchDepositHistory();
  }

  fetchDepositHistory() {
    this.http.get<{ date: string; amount: number }[]>('http://localhost:3000/api/transactions/user')
      .subscribe(
        data => {
          this.depositHistory = data.filter(transaction => transaction.amount > 0);
        },
        error => {
          console.error('Error fetching deposit history:', error);
        }
      );
  }

  onDeposit() {
    const idCard = this.authService.getUserIdCard();
    if (idCard && this.depositAmount > 0) {
      this.http.post<{ message: string; transactions: { date: string; amount: number }[] }>('http://localhost:3000/api/transactions/deposit', { idCard, amount: this.depositAmount })
        .subscribe(
          response => {
            this.depositHistory = response.transactions;
            this.message = `ฝากเงินจำนวน ${this.depositAmount} บาท สำเร็จ!`;
            this.depositAmount = 0; // ล้างฟิลด์หลังการฝาก
          },
          error => {
            console.error('Error during deposit:', error);
            this.message = 'เกิดข้อผิดพลาดในการฝากเงิน';
          }
        );
    } else {
      this.message = 'กรุณากรอกจำนวนเงินที่ถูกต้อง';
    }
  }
}