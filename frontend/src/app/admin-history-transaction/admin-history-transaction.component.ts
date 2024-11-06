import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-history-transaction',
  templateUrl: './admin-history-transaction.component.html',
  styleUrls: ['./admin-history-transaction.component.css']
})
export class AdminHistoryTransactionComponent implements OnInit {
  transactionHistory: { date: string; amount: number; transactionType: string; user: string }[] = [];
  filteredHistory: { date: string; amount: number; transactionType: string; user: string }[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactionHistory();
  }

  fetchTransactionHistory() {
    this.http.get<{ date: string; amount: number; transactionType: string; user: string }[]>('http://localhost:3000/api/transactions/admin')
      .subscribe(
        data => {
          this.transactionHistory = data.map(transaction => ({
            ...transaction,
            date: this.formatDate(transaction.date)
          }));
          this.filteredHistory = this.transactionHistory;
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

  onSearch() {
    this.filteredHistory = this.transactionHistory.filter(transaction =>
      transaction.user.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      transaction.transactionType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      transaction.date.includes(this.searchQuery)
    );
  }
}