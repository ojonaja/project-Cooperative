import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawAmount: number = 0;
  withdrawHistory: { date: string; amount: number }[] = [];
  message: string | null = null;
  totalBalance: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchWithdrawHistory();
  }

  fetchWithdrawHistory() {
    this.http.get<{ date: string; amount: number }[]>('http://localhost:3000/api/transactions/user')
      .subscribe(
        data => {
          this.withdrawHistory = data.filter(transaction => transaction.amount < 0);
          this.calculateTotalBalance();
        },
        error => {
          console.error('Error fetching withdraw history:', error);
        }
      );
  }

  calculateTotalBalance() {
    this.totalBalance = this.withdrawHistory.reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  onWithdraw() {
    const idCard = this.authService.getUserIdCard();
    if (idCard && this.withdrawAmount > 0) {
      this.http.post<{ message: string; transactions: { date: string; amount: number }[] }>('http://localhost:3000/api/transactions/withdraw', { idCard, amount: this.withdrawAmount })
        .subscribe(
          response => {
            if (response.message === 'Insufficient balance') {
              this.message = 'ยอดเงินคงเหลือไม่เพียงพอ';
            } else {
              this.withdrawHistory = response.transactions;
              this.message = `ถอนเงินจำนวน ${this.withdrawAmount} บาท สำเร็จ!`;
              this.withdrawAmount = 0; // ล้างฟิลด์หลังการถอน
            }
          },
          error => {
            console.error('Error during withdraw:', error);
            this.message = 'เกิดข้อผิดพลาดในการถอนเงิน';
          }
        );
    } else {
      this.message = 'กรุณากรอกจำนวนเงินที่ถูกต้อง';
    }
  }
}