import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  depositPercent: number = 0;
  withdrawalPercent: number = 0;
  annualInterest: number = 0;
  chartData: ChartDataset[] = [];
  chartLabels: string[] = ['ฝากเงิน', 'ถอนเงิน'];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReportData().subscribe(data => {
      const depositAmount = data[0].depositAmount;
      const withdrawalAmount = data[0].withdrawalAmount;
      const total = depositAmount + withdrawalAmount;

      this.depositPercent = (depositAmount / total) * 100;
      this.withdrawalPercent = (withdrawalAmount / total) * 100;
      this.annualInterest = data[0].annualInterest;

      this.chartData = [
        { data: [this.depositPercent, this.withdrawalPercent], label: 'Deposit vs Withdrawal' }
      ];
    });
  }
}