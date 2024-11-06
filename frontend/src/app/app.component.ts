import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-Cooperative';
  userName: string | null = null;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    this.userName = this.authService.getUserName();
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'admin';
    this.isUser = role === 'user';
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}