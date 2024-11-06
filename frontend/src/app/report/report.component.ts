import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  depositPercent: number = 0;
  withdrawalPercent: number = 0;
  annualInterest: number = 0;
  totalMoney: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReportData().subscribe(data => {
      const depositAmount = data[0].depositAmount;
      const withdrawalAmount = data[0].withdrawalAmount;
      const total = depositAmount + withdrawalAmount;

      this.depositPercent = (depositAmount / total) * 100;
      this.withdrawalPercent = (withdrawalAmount / total) * 100;
      this.annualInterest = data[0].annualInterest;
      this.totalMoney = total;
    });
  }
}