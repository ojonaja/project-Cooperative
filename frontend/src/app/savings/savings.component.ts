import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
  transactionHistory: { date: string; amount: number; transactionType: string }[] = [];
  totalBalance: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactionHistory();
  }

  fetchTransactionHistory() {
    this.http.get<{ date: string; amount: number; transactionType: string }[]>('http://localhost:3000/api/transactions/all')
      .subscribe(
        data => {
          this.transactionHistory = data.map(transaction => ({
            ...transaction,
            date: this.formatDate(transaction.date)
          }));
          this.calculateTotalBalance();
        },
        error => {
          console.error('Error fetching transaction history:', error);
        }
      );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`;
  }

  pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  calculateTotalBalance() {
    this.totalBalance = this.transactionHistory.reduce((acc, transaction) => acc + transaction.amount, 0);
  }
}