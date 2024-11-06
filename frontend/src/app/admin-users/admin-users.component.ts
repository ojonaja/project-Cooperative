import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserRole() === 'admin';
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        this.errorMessage = 'Error fetching users';
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        response => {
          this.successMessage = 'User updated successfully';
          this.errorMessage = null;
          this.getUsers(); // Refresh the user list
          this.selectedUser = null; // Clear the selected user
        },
        error => {
          this.errorMessage = 'Error updating user';
          this.successMessage = null;
        }
      );
    }
  }

  deleteUser(idCard: string) {
    this.userService.deleteUser(idCard).subscribe(
      response => {
        this.successMessage = 'User deleted successfully';
        this.errorMessage = null;
        this.getUsers(); // Refresh the user list
      },
      error => {
        this.errorMessage = 'Error deleting user';
        this.successMessage = null;
      }
    );
  }
}